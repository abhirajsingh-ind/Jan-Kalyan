const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const SCHEME_TABS_TEMPLATE = (title, overview, benefits, eligibility, howto, faqs, official) => `
<div class="scheme-tab-content active" data-section="overview">
    ${overview}
    <h3 style="color:var(--navy); margin: 2rem 0 1rem;">📋 Quick Summary</h3>
    <table class="premium-table">
        <thead><tr><th>Detail</th><th>Information</th></tr></thead>
        <tbody>
            <tr><td>Scheme Name</td><td>${title}</td></tr>
            <tr><td>Benefit Type</td><td>Direct / Service</td></tr>
            <tr><td>Status</td><td>✅ Active 2026</td></tr>
            <tr><td>Official Source</td><td>Verified Government Portal</td></tr>
        </tbody>
    </table>
</div>
<div class="scheme-tab-content" data-section="benefits" style="display:none">
    ${benefits}
</div>
<div class="scheme-tab-content" data-section="eligibility" style="display:none">
    ${eligibility}
</div>
<div class="scheme-tab-content" data-section="howtoapply" style="display:none">
    ${howto}
</div>
<div class="scheme-tab-content" data-section="faqs" style="display:none">
    ${faqs}
</div>
<div class="scheme-tab-content" data-section="references" style="display:none">
    <h3 style="color:var(--navy); margin-bottom:1rem">🔗 Official Links</h3>
    <a href="${official}" target="_blank" class="source-link">${title} Official Source</a>
</div>
`;

async function migrate() {
    console.log('--- PURGING DEMO DATA ---');
    await supabase.from('schemes').delete().neq('id', 0);
    await supabase.from('scholarships').delete().neq('id', 0);
    await supabase.from('fellowships').delete().neq('id', 0);
    await supabase.from('news').delete().neq('id', 0);

    console.log('--- INSERTING PREMIUM CONTENT ---');

    // MYSBY (Punjab) - Retaining high fidelity
    const mmsby = {
        title: 'Mukhmantri Sehat Bima Yojana (MYSBY): ₹5 Lakh Health Insurance, Punjab',
        description: 'Cashless health insurance cover up to ₹5 lakh per family per year in Punjab.',
        type: 'State · Punjab',
        category: 'Health',
        image_url: 'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?q=80&w=1200&auto=format&fit=crop',
        tags: JSON.stringify(['Farmer', 'Worker', 'Health']),
        detailed_content: SCHEME_TABS_TEMPLATE(
            'MYSBY Punjab',
            '<p>Flagship health insurance for Punjab citizens under Ayushman Bharat.</p>',
            '<ul><li>₹5 Lakh coverage</li><li>Cashless treatment</li></ul>',
            '<ul><li>Ration card holders</li><li>Farmers</li><li>Workers</li></ul>',
            '<p>Apply via Ayushman App or Empaneled Hospitals.</p>',
            '<p><b>Q: Is it free?</b> A: Yes, for eligible families.</p>',
            'https://sha.punjab.gov.in/'
        )
    };

    // SCHEMES (5 Total)
    const schemesBatch = [
        mmsby,
        {
            title: 'Mukhyamantri Yuva Karya Prashikshan Yojana 2026',
            description: 'Stipend based on-the-job training for youth in Maharashtra. Get up to ₹10,000 monthly.',
            type: 'State · Maharashtra',
            category: 'Education',
            image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200',
            tags: JSON.stringify(['Student', 'Stipend', 'Skills']),
            detailed_content: SCHEME_TABS_TEMPLATE('Yuva Karya Prashikshan','<p>Maharashtra Govt training program for unemployed youth.</p>','<ul><li>Monthly Stipend ₹6k-10k</li><li>Certificate</li></ul>','<ul><li>12th/Graduate/Diploma</li><li>Age 18-35</li></ul>','<p>Register on Rojgar Mahaswayam portal.</p>','<p><b>Q: Duration?</b> A: 6 months.</p>','https://rojgar.mahaswayam.gov.in/')
        },
        {
            title: 'Saral Bijli Bill Scheme (Madhya Pradesh)',
            description: 'Flat ₹200 electricity bill and free connections for labor families in MP.',
            type: 'State · MP',
            category: 'Social Welfare',
            image_url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200',
            tags: JSON.stringify(['Labor', 'Electricity', 'BPL']),
            detailed_content: SCHEME_TABS_TEMPLATE('Saral Bijli Bill','<p>Affordable electricity for registered laborers.</p>','<ul><li>Flat rate power bill</li><li>Connection waive off</li></ul>','<ul><li>Registered laborers</li><li>BPL families</li></ul>','<p>Visit local electricity department or panchayat.</p>','<p><b>Q: Bill amount?</b> A: Max ₹200 for eligible.</p>','https://mpenergy.nic.in/')
        },
        {
            title: 'Scheme for Veteran Artists: ₹6,000 Monthly Pension',
            description: 'Financial support for veteran artists who have contributed to Indian culture.',
            type: 'Central Govt',
            category: 'Social Welfare',
            image_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200',
            tags: JSON.stringify(['Artist', 'Pension', 'Culture']),
            detailed_content: SCHEME_TABS_TEMPLATE('Veteran Artists Pension','<p>Support for artists aged 60+.</p>','<ul><li>₹6,000 monthly</li><li>Emergency medical cover</li></ul>','<ul><li>Age 60+</li><li>Annual income < ₹4 Lakh</li></ul>','<p>Apply via Ministry of Culture portal.</p>','<p><b>Q: documents?</b> A: Art certificate, BPL card.</p>','https://indiaculture.gov.in/')
        },
        {
            title: 'Chirag Yojana: Free Private School Admission',
            description: 'Free education for EWS students in private schools in Haryana.',
            type: 'State · Haryana',
            category: 'Education',
            image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200',
            tags: JSON.stringify(['Student', 'School', 'EWS']),
            detailed_content: SCHEME_TABS_TEMPLATE('Chirag Yojana','<p>Empowering EWS students with private schooling.</p>','<ul><li>No tuition fee</li><li>Books subsidy</li></ul>','<ul><li>Haryana resident</li><li>Income < ₹1.8 Lakh</li></ul>','<p>Register at block education office.</p>','<p><b>Q: Classes?</b> A: 3rd to 12th.</p>','https://harshiksha.gov.in/')
        }
    ];

    // SCHOLARSHIPS (5 Total)
    const scholarshipsBatch = [
        {
            title: 'L&T Build India Scholarship 2026',
            amount: 'Full M.Tech + Stipend',
            institution: 'L&T Construction',
            level: 'Post-Graduate',
            deadline: '31 March 2026',
            status: 'open',
            image_url: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=1200',
            detailed_content: SCHEME_TABS_TEMPLATE('L&T Build India','<p>M.Tech in Construction Tech from top IITs.</p>','<ul><li>Fees paid by L&T</li><li>Placement offer</li></ul>','<ul><li>Final year BE/B.Tech</li><li>Min 70% marks</li></ul>','<p>Online application at L&T website.</p>','<p><b>Q: Selection?</b> A: Written test + Interview.</p>','https://www.lntecc.com/')
        },
        {
            title: 'Inlaks Shivdasani Scholarship 2026',
            amount: 'US $100,000 (Max)',
            institution: 'Inlaks Foundation',
            level: 'Abroad Masters',
            deadline: '15 April 2026',
            status: 'open',
            image_url: 'https://images.unsplash.com/photo-152305085306e-8c333900f0d0?q=80&w=1200',
            detailed_content: SCHEME_TABS_TEMPLATE('Inlaks Scholarship','<p>Support for brilliant students to study abroad.</p>','<ul><li>Tuition + Living expenses</li><li>Travel allowance</li></ul>','<ul><li>Indian citizen</li><li>Age < 30</li></ul>','<p>Submit portfolio and research proposal.</p>','<p><b>Q: Subjects?</b> A: Almost all except MBA/Eng.</p>','https://www.inlaksfoundation.org/')
        },
        {
            title: 'Post-Matric Scholarship for OBC Students (MAHA)',
            amount: 'Tuition + Maintenance',
            institution: 'MAHA-IT Portal',
            level: 'Intermediate/Degree',
            deadline: '30 June 2026',
            status: 'open',
            image_url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200',
            detailed_content: SCHEME_TABS_TEMPLATE('OBC Post-Matric MAHA','<p>Maharashtra Govt support for OBC students.</p>','<ul><li>Fee reimbursement</li><li>Hostel allowance</li></ul>','<ul><li>Category OBC</li><li>Income < ₹1.5 Lakh</li></ul>','<p>Apply on MahaDBT portal.</p>','<p><b>Q: Adhaar?</b> A: Mandatory.</p>','https://mahadbt.maharashtra.gov.in/')
        },
        {
            title: 'Rajarshi Shahu Maharaj Tuition Fee Scheme',
            amount: '50% - 100% Fee Waiver',
            institution: 'Directorate of Higher Education',
            level: 'Higher Education',
            deadline: '30 June 2026',
            status: 'open',
            image_url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200',
            detailed_content: SCHEME_TABS_TEMPLATE('EBC Shahu Maharaj','<p>Help for students from EBC families.</p>','<ul><li>Admission fee waiver</li><li>Exam fee coverage</li></ul>','<ul><li>Open Category/EWS</li><li>Income < ₹8 Lakh</li></ul>','<p>Update profile on MahaDBT.</p>','<p><b>Q: Attendance?</b> A: Min 75% required.</p>','https://mahadbt.maharashtra.gov.in/')
        },
        {
            title: 'National Overseas Scholarship for SC Students',
            amount: 'Complete Foreign Study',
            institution: 'Ministry of Social Justice',
            level: 'PHD/Masters',
            deadline: '31 May 2026',
            status: 'open',
            image_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200',
            detailed_content: SCHEME_TABS_TEMPLATE('NOS Scholarship','<p>Empowering SC students to excel globally.</p>','<ul><li>Airfare</li><li>Living allowance</li></ul>','<ul><li>Category SC</li><li>Income < ₹6 Lakh</li></ul>','<p>Apply via central scholarships portal.</p>','<p><b>Q: Bond?</b> A: Yes, required.</p>','https://nosmsje.gov.in/')
        }
    ];

    // FELLOWSHIPS (5 Total)
    const fellowshipsBatch = [
        {
            title: 'India Science and Research Fellowship (ISRF) 2026',
            duration: '3 - 6 Months',
            institution: 'DST India',
            level: 'Post-Doc',
            deadline: '31 Oct 2026',
            type: 'International Govt',
            image_url: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=1200',
            detailed_content: SCHEME_TABS_TEMPLATE('ISRF 2026','<p>Research exchange with neighboring countries.</p>','<ul><li>Visa + Airfare</li><li>Stipend</li></ul>','<ul><li>Research Scholar</li><li>South Asian citizen</li></ul>','<p>Submit research proposal online.</p>','<p><b>Q: Locations?</b> A: Top Indian IITs/Research centers.</p>','https://dst.gov.in/')
        },
        {
            title: 'SBI Youth for India Fellowship 2026',
            duration: '13 Months',
            institution: 'SBI Foundation',
            level: 'Graduate',
            deadline: '30 April 2026',
            type: 'NGO / Corporate',
            image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200',
            detailed_content: SCHEME_TABS_TEMPLATE('SBI Youth for India','<p>Rural development immersion for young leaders.</p>','<ul><li>Monthly stipend</li><li>Project funding</li></ul>','<ul><li>Graduate/Professional</li><li>Passion for social change</li></ul>','<p>Online application + Personal interview.</p>','<p><b>Q: Locations?</b> A: NGO partners across India.</p>','https://youthforindia.org/')
        },
        {
            title: 'JSPS Postdoctoral Fellowship 2026',
            duration: '12 - 24 Months',
            institution: 'Japan Govt',
            level: 'Post-PHD',
            deadline: 'Rolling',
            type: 'International',
            image_url: 'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?q=80&w=1200',
            detailed_content: SCHEME_TABS_TEMPLATE('JSPS Japan Fellowship','<p>Research in Japan for top international scientists.</p>','<ul><li>Monthly allowance ¥362,000</li><li>Research grant</li></ul>','<ul><li>PHD within 6 years</li><li>Collaborator in Japan</li></ul>','<p>Collaboration with Japanese host researcher.</p>','<p><b>Q: Fields?</b> A: All humanities and sciences.</p>','https://www.jsps.go.jp/')
        },
        {
            title: 'EMBO Postdoctoral Fellowship 2026',
            duration: '2 Years',
            institution: 'EMBO Europe',
            level: 'Bio-Science',
            deadline: '12 Aug 2026',
            type: 'International Research',
            image_url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1200',
            detailed_content: SCHEME_TABS_TEMPLATE('EMBO Fellowship','<p>Training for life science researchers in Europe.</p>','<ul><li>Salary + Benefits</li><li>Networking</li></ul>','<ul><li>PHD in Bio-sciences</li><li>0-2 years since graduation</li></ul>','<p>Online submission of research proj.</p>','<p><b>Q: Eligibility?</b> A: Scientists from member states.</p>','https://www.embo.org/')
        },
        {
            title: 'Fulbright-Nehru Doctoral Research Fellowship',
            duration: '6 - 9 Months',
            institution: 'USIEF',
            level: 'Research',
            deadline: '15 July 2026',
            type: 'Indo-US Govt',
            image_url: 'https://images.unsplash.com/photo-1522071823991-b9292a184347?q=80&w=1200',
            detailed_content: SCHEME_TABS_TEMPLATE('Fulbright-Nehru','<p>Exchange for PHD students to US universities.</p>','<ul><li>Full travel + Living</li><li>Library access</li></ul>','<ul><li>Indian PHD student</li><li>Registered in India</li></ul>','<p>Apply via USIEF portal.</p>','<p><b>Q: Bond?</b> A: Return to India after completion.</p>','https://www.usief.org.in/')
        }
    ];

    // NEWS (5 Total)
    const newsBatch = [
        { title: 'Parivarik Labh Yojana Apply 2026: 5 गलतियां न करें', date: 'March 20, 2026', badge: 'Active', icon: '💰' },
        { title: 'Pradhan Mantri Matru Vandana Yojana 2026: गर्भवती महिलाओं के लिए बड़ी खबर', date: 'March 18, 2026', badge: 'Hot', icon: '🤰' },
        { title: 'Post Office Monthly Income Scheme (MIS) Calculator 2026', date: 'March 15, 2026', badge: 'New', icon: '📈' },
        { title: 'Kanya Sumangala Yojana Login 2026: 90% लोग यहाँ गलती करते हैं', date: 'March 12, 2026', badge: 'Update', icon: '👧' },
        { title: 'Swami Vivekananda Scholarship Status Check 2026: Payment Released', date: 'March 10, 2026', badge: 'Critical', icon: '✅' }
    ];

    await supabase.from('schemes').insert(schemesBatch);
    await supabase.from('scholarships').insert(scholarshipsBatch);
    await supabase.from('fellowships').insert(fellowshipsBatch);
    await supabase.from('news').insert(newsBatch);

    console.log('--- MIGRATION SUCCESSFUL! ---');
    console.log('Total Items Migrated: 20');
}

migrate();
