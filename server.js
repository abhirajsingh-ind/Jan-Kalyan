const express = require('express');
const cors = require('cors');
const path = require('path');
const supabase = require('./supabase');

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname)));

// API Routes
app.get('/api/schemes', async (req, res) => {
  const category = req.query.category;
  let query = supabase.from('schemes').select('*');
  
  if (category && category !== 'सभी') {
    query = query.eq('category', category);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get('/api/scholarships', async (req, res) => {
  const { data, error } = await supabase.from('scholarships').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data || []);
});

app.get('/api/fellowships', async (req, res) => {
  const { data, error } = await supabase.from('fellowships').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data || []);
});

app.get('/api/news', async (req, res) => {
  const { data, error } = await supabase.from('news').select('*').order('date', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data || []);
});

app.get('/api/search', async (req, res) => {
  const q = req.query.q;
  if (!q) return res.json([]);
  
  const query = `%${q}%`;
  
  const [schemes, scholarships, fellowships] = await Promise.all([
    supabase.from('schemes').select('*').or(`title.ilike.${query},description.ilike.${query}`).order('created_at', { ascending: false }),
    supabase.from('scholarships').select('*').or(`title.ilike.${query},institution.ilike.${query}`).order('created_at', { ascending: false }),
    supabase.from('fellowships').select('*').or(`title.ilike.${query},institution.ilike.${query}`).order('created_at', { ascending: false })
  ]);

  if (schemes.error || scholarships.error || fellowships.error) {
    return res.status(500).json({ error: 'Search failed' });
  }

  res.json({
    schemes: schemes.data || [],
    scholarships: scholarships.data || [],
    fellowships: fellowships.data || []
  });
});

// Fallback for index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
