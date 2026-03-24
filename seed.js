const db = require('./database');

const schemes = [
  {
    title: 'Mukhyamantri Yuva Karya Prashikshan Yojana 2026',
    description: 'Enhances employability through practical training. ₹10,000 monthly stipend for young candidates.',
    type: 'State',
    icon: '💼',
    category: 'Skills'
  },
  {
    title: 'Saral Bijli Bill Scheme — Madhya Pradesh',
    description: '₹200/month fixed electricity bill + free domestic connections for eligible BPL beneficiaries.',
    type: 'State · MP',
    icon: '⚡',
    category: 'Utility'
  },
  {
    title: 'Scheme for Financial Assistance for Veteran Artists',
    description: '₹6,000/month pension for elderly artists who have significantly contributed to their specialized fields.',
    type: 'Central',
    icon: '🎭',
    category: 'Culture'
  },
  {
    title: 'Chirag Yojana — Free Private School Admission',
    description: 'Free education in private schools for children from economically weaker sections. Registration open now.',
    type: 'State · Haryana',
    icon: '🏫',
    category: 'Education'
  },
  {
    title: 'Mukhmantri Sehat Bima Yojana (MYSBY)',
    description: '₹5 Lakh health insurance coverage per family. Punjab flagship scheme under Ayushman Bharat PM-JAY.',
    type: 'State · Punjab',
    icon: '🏥',
    category: 'Health'
  },
  {
    title: 'National Family Benefit Scheme for BPL Families',
    description: '₹20,000 one-time financial assistance for BPL families upon the death of the primary earning member.',
    type: 'State · Haryana',
    icon: '👨‍👩‍👧',
    category: 'Social Welfare'
  }
];

const scholarships = [
  {
    title: 'L&T Build India Scholarship 2026',
    amount: '₹13,400/month + Full Tuition',
    status: 'closing',
    deadline: '26 Mar 2026',
    institution: 'Larsen & Toubro Limited',
    level: 'Post Graduation · Civil/Electrical Engg',
    icon: '🏭'
  },
  {
    title: 'Inlaks Shivdasani Scholarship 2026 — Study Abroad',
    amount: 'USD 120,000',
    status: 'closing',
    deadline: '01 Apr 2026',
    institution: 'Inlaks Shivdasani Foundation',
    level: 'Graduation, Post Graduation',
    icon: '✈️'
  },
  {
    title: 'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulk Shishyavrutti Yojna — Maharashtra',
    amount: 'Up to ₹1,00,000/year',
    status: 'open',
    deadline: '01 Apr 2026',
    institution: 'Dept of Higher Education',
    level: 'PG, UG, Polytechnic/Diploma',
    icon: '📜'
  }
];

const fellowships = [
  {
    title: 'India Science and Research Fellowship (ISRF) 2026',
    amount: '₹50,000/month',
    duration: '3 to 6 months',
    institution: 'DST (Dept of Science & Technology)',
    level: 'PhD or M.Tech/M.Sc/MBBS',
    type: 'Short-term',
    deadline: '7 days left'
  },
  {
    title: 'SBI Youth for India Fellowship 2026',
    amount: '₹20,000/month',
    duration: '13 months',
    institution: 'Government of India',
    level: "Bachelor's degree required",
    type: 'Social Sector',
    deadline: '30 Apr 2026'
  }
];

const news = [
  { title: 'Parivarik Labh Yojana Apply 2026: 5 गलतियां न करें', date: '24 Mar 2026', badge: 'LIVE', icon: '💰' },
  { title: 'Pradhan Mantri Matru Vandana Yojana Apply Online 2026', date: '23 Mar 2026', badge: 'NEW', icon: '🤱' },
  { title: 'Chirag Yojana Online Registration 2026', date: '20 Mar 2026', badge: 'HOT', icon: '🏫' }
];

db.serialize(() => {
  db.run('DELETE FROM schemes');
  db.run('DELETE FROM scholarships');
  db.run('DELETE FROM fellowships');
  db.run('DELETE FROM news');

  const stmtScheme = db.prepare('INSERT INTO schemes (title, description, type, icon, category) VALUES (?, ?, ?, ?, ?)');
  schemes.forEach(s => stmtScheme.run(s.title, s.description, s.type, s.icon, s.category));
  stmtScheme.finalize();

  const stmtScholar = db.prepare('INSERT INTO scholarships (title, amount, status, deadline, institution, level, icon) VALUES (?, ?, ?, ?, ?, ?, ?)');
  scholarships.forEach(s => stmtScholar.run(s.title, s.amount, s.status, s.deadline, s.institution, s.level, s.icon));
  stmtScholar.finalize();

  const stmtFellow = db.prepare('INSERT INTO fellowships (title, amount, duration, institution, level, type, deadline) VALUES (?, ?, ?, ?, ?, ?, ?)');
  fellowships.forEach(f => stmtFellow.run(f.title, f.amount, f.duration, f.institution, f.level, f.type, f.deadline));
  stmtFellow.finalize();

  const stmtNews = db.prepare('INSERT INTO news (title, date, badge, icon) VALUES (?, ?, ?, ?)');
  news.forEach(n => stmtNews.run(n.title, n.date, n.badge, n.icon));
  stmtNews.finalize();

  console.log('Database seeded successfully');
});
