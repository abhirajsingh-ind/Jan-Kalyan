const supabase = require('./supabase');

async function addScheme() {
  const mmsby = {
    title: "Mukhyamantri Medhavi Vidyarthi Yojana (MMSBY)",
    description: "Empowering meritorious students of Madhya Pradesh by providing full financial assistance for higher education in Engineering, Medical, Law, and more.",
    type: "State · MP",
    category: "Education",
    icon: "🎓",
    image_url: "/images/mmsby_banner.png",
    tags: ["Student", "BPL", "Merit"],
    link: "https://medhavikalyan.mp.gov.in/",
    // Large detailed content for modal
    detailed_content: `
      <div class="scheme-detail-full">
        <p>The <strong>Mukhyamantri Medhavi Vidyarthi Yojana (MMSBY)</strong> is a flagship educational initiative by the Government of Madhya Pradesh. It ensures that meritorious students from the state are not deprived of higher education due to financial constraints by covering their entire tuition and admission fees.</p>
        
        <h3 style="color:var(--navy); margin: 1.5rem 0 1rem;">📋 Eligibility Criteria</h3>
        <table style="width:100%; border-collapse: collapse; margin-bottom: 1.5rem; border: 1px solid var(--gray-200); border-radius: 12px; overflow: hidden;">
          <tr style="background: var(--navy); color: white;">
            <th style="padding: 12px; text-align: left;">Criterion</th>
            <th style="padding: 12px; text-align: left;">Requirement</th>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid var(--gray-100);">Residency</td>
            <td style="padding: 12px; border-bottom: 1px solid var(--gray-100);">Permanent resident of Madhya Pradesh</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 12px; border-bottom: 1px solid var(--gray-100);">Family Income</td>
            <td style="padding: 12px; border-bottom: 1px solid var(--gray-100);">Less than ₹6,00,000 per annum</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid var(--gray-100);">MP Board (12th)</td>
            <td style="padding: 12px; border-bottom: 1px solid var(--gray-100);">70% marks or above</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 12px; border-bottom: 1px solid var(--gray-100);">CBSE/ICSE (12th)</td>
            <td style="padding: 12px; border-bottom: 1px solid var(--gray-100);">85% marks or above</td>
          </tr>
        </table>

        <h3 style="color:var(--navy); margin: 1.5rem 0 1rem;">✨ Major Benefits</h3>
        <ul style="padding-left: 20px; line-height: 1.8; color: var(--gray-600);">
          <li><strong>Full Fee Waiver:</strong> The state government covers the entire non-refundable fee for Engineering, Medical, and other professional courses.</li>
          <li><strong>Engineering Students:</strong> Applicable for students with a JEE Mains rank within the top 1.5 Lakh.</li>
          <li><strong>Medical Students:</strong> Covers fees for students admitted to Government Medical Colleges via NEET.</li>
          <li><strong>Law Students:</strong> Covers fees for students admitted through CLAT in National Law Universities.</li>
        </ul>

        <h3 style="color:var(--navy); margin: 1.5rem 0 1rem;">🚀 How to Apply</h3>
        <ol style="padding-left: 20px; line-height: 1.8; color: var(--gray-600);">
          <li>Register online at the official <strong>Medhavi Kalyan Portal</strong>.</li>
          <li>Upload required documents including Income certificate, Domicile, and 12th marksheet.</li>
          <li>The application will be verified by your respective educational institution.</li>
        </ol>

        <p style="margin-top: 2rem; font-size: 0.9rem; color: var(--gray-400);"><em>SEO Keywords: MP Medhavi Yojana 2024, MMSBY eligibility, scholarship for MP students, free education Madhya Pradesh.</em></p>
      </div>
    `
  };

  const { error } = await supabase.from('schemes').insert([mmsby]);
  if (error) {
    console.error('Error adding MMSBY scheme:', error.message);
  } else {
    console.log('Successfully added MMSBY scheme to database.');
  }
}

addScheme();
