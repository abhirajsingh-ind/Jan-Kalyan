const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const supabase = require('./supabase');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

async function migrate() {
  console.log('Starting migration from SQLite to Supabase...');

  // Helper to migrate a table
  async function migrateTable(tableName) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM ${tableName}`, [], async (err, rows) => {
        if (err) return reject(err);
        if (rows.length === 0) {
          console.log(`No data in ${tableName} to migrate.`);
          return resolve();
        }

        console.log(`Migrating ${rows.length} rows to ${tableName}...`);
        
        // Enhance rows with sample data for the new design
        const cleanRows = rows.map(r => {
          const { id, ...rest } = r;
          
          if (tableName === 'schemes') {
            // Sample images based on title keywords
            let img = 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=800&auto=format&fit=crop'; // Agriculture
            if (r.title.includes('Yuva') || r.title.includes('Education')) img = 'https://images.unsplash.com/photo-1523050335456-c38730b0ebf4?q=80&w=800&auto=format&fit=crop'; // Education/Youth
            if (r.title.includes('Health') || r.title.includes('Bima')) img = 'https://images.unsplash.com/photo-1538108176447-28058c49a031?q=80&w=800&auto=format&fit=crop'; // Health
            if (r.title.includes('Family') || r.title.includes('Women')) img = 'https://images.unsplash.com/photo-1484863137850-59afccd05186?q=80&w=800&auto=format&fit=crop'; // Social/Family
            
            rest.image_url = img;
            rest.tags = JSON.stringify(['Student', 'BPL', 'EWS'].slice(0, Math.floor(Math.random() * 3) + 1));
            rest.detailed_content = `
              <div class="scheme-detail-full">
                <p>${r.description}</p>
                <h3 style="color:var(--navy); margin: 1.5rem 0 1rem;">📋 Quick Information</h3>
                <ul style="padding-left: 20px; line-height: 1.8; color: var(--gray-600);">
                  <li><strong>Category:</strong> ${r.category}</li>
                  <li><strong>Type:</strong> ${r.type}</li>
                  <li><strong>Status:</strong> Currently Active</li>
                </ul>
                <p>For more details, please visit the official government portal or contact your local administrative office.</p>
              </div>
            `;
          }
          
          return rest;
        });

        // Clear existing data before migration to avoid duplicates if re-running
        await supabase.from(tableName).delete().neq('id', 0);

        const { error } = await supabase.from(tableName).insert(cleanRows);
        if (error) {
          console.error(`Error migrating ${tableName}:`, error.message);
          return reject(error);
        }
        console.log(`Successfully migrated ${tableName}.`);
        resolve();
      });
    });
  }

  try {
    await migrateTable('schemes');
    await migrateTable('scholarships');
    await migrateTable('fellowships');
    await migrateTable('news');
    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
