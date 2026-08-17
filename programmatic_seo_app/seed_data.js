const https = require('https');

const SUPABASE_URL = "https://idlmeduwekczlizgpvcx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkbG1lZHV3ZWtjemxpemdwdmN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1NTUxODQsImV4cCI6MjEwMjEzMTE4NH0.oEULTKL9tE94c6vNp8vZtHGzQG0CFZG9nrHDuER9jvo";

const locations = [
  "Delhi", "Noida", "Greater Noida", "Gurgaon", "Ghaziabad", "Faridabad",
  "Greater Kailash", "South Extension", "Safdarjung Enclave",
  "Hauz Khas", "Vasant Vihar", "Vasant Kunj", "Defense Colony",
  "New Friends Colony", "Saket", "Dwarka", "Sector 15 Noida", "Sector 62 Noida", "Indirapuram"
];

const services = [
  {
    id: "icu-nursing",
    category: "ICU Nursing",
    title: "ICU Nursing at Home",
    meta: "Hospital-grade ICU setup and certified 24/7 nursing care at home in {LOC}. Advanced monitoring, ventilator handling & post-op care by Stoic Home Care.",
    hero: "Professional critical care delivered right to your home in {LOC} by highly trained ICU nurses.",
    content: "<h2>Critical Care & ICU Nursing at Home in {LOC}</h2><p>When a family member requires intensive care, hospital stays can be stressful and costly. Stoic Home Care brings a complete hospital-grade ICU setup to your home in {LOC}. Our registered nurses specialize in ventilator management, BiPAP, tracheostomy care, IV infusion, and continuous vital monitoring.</p><h3>Why Choose Stoic Home Care in {LOC}?</h3><ul><li>ICU-certified registered nurses & trained attendants 24/7.</li><li>Hospital-grade sanitized medical equipment setup within 4 hours.</li><li>Continuous doctor coordination and daily vitals reporting.</li></ul>"
  },
  {
    id: "oxygen-cylinder",
    category: "Oxygen Cylinder",
    title: "Oxygen Cylinder on Rent",
    meta: "Emergency medical-grade oxygen cylinder on rent in {LOC}. 24/7 fast doorstep delivery and installation for COPD, asthma & emergency support.",
    hero: "Fast 24/7 delivery and installation of medical-grade oxygen cylinders in {LOC}.",
    content: "<h2>Medical-Grade Oxygen Cylinder Rental in {LOC}</h2><p>During respiratory emergencies, speed is vital. Stoic Home Care provides 24/7 delivery and technician installation of sanitized oxygen cylinders and 5L/10L oxygen concentrators across {LOC}.</p><h3>Complete Respiratory Care Setup</h3><p>We supply B-type, D-type oxygen cylinders, flow meters, humidifiers, and nasal cannulas with full safety instruction for home use.</p>"
  },
  {
    id: "physiotherapy",
    category: "Physiotherapy",
    title: "Physiotherapy at Home",
    meta: "Certified physiotherapy at home in {LOC}. Post-surgery rehabilitation, stroke recovery, paralysis rehab & joint pain relief by Stoic Home Care physios.",
    hero: "Recover faster with personalized physiotherapy sessions at home in {LOC}.",
    content: "<h2>Expert Home Physiotherapy in {LOC}</h2><p>Rehabilitation is most effective when conducted in a comfortable, familiar environment. Stoic Home Care brings licensed physiotherapists to your doorstep in {LOC}.</p><h3>Specialized Treatment Protocols</h3><ul><li>Stroke & Neurological Rehabilitation</li><li>Post-operative Knee/Hip Replacement Recovery</li><li>Geriatric & Arthritis Pain Management</li></ul>"
  },
  {
    id: "elder-care",
    category: "Elder Care",
    title: "Elder Care & Attendants",
    meta: "Compassionate elder care services & trained nursing attendants in {LOC}. Daily living assistance, medication management & 24/7 companion care for seniors.",
    hero: "Dignified, round-the-clock elder care services in {LOC}.",
    content: "<h2>Dedicated Senior Care Services in {LOC}</h2><p>Caring for aging parents requires patience, dignity, and expert care. Stoic Home Care provides verified 12-hour and 24-hour elder care attendants across {LOC} for mobility assistance, personal hygiene, feeding, and medical supervision.</p>"
  }
];

const seoPayload = [];
locations.forEach(loc => {
  services.forEach(srv => {
    const slug = `${srv.id}-at-home-${loc.toLowerCase().replace(/\s+/g, '-')}`;
    seoPayload.push({
      slug: slug,
      category: srv.category,
      location: loc,
      page_title: `Best ${srv.title} in ${loc} | Stoic Home Care`,
      meta_desc: srv.meta.replace(/\{LOC\}/g, loc),
      h1_title: `Expert ${srv.title} in ${loc}`,
      hero_subtitle: srv.hero.replace(/\{LOC\}/g, loc),
      content_html: srv.content.replace(/\{LOC\}/g, loc)
    });
  });
});

const blogsPayload = [
  {
    slug: "oxygen-cylinder-vs-concentrator-which-is-best-for-home",
    title: "Oxygen Cylinder vs. Concentrator: Which is Best for Home Care?",
    excerpt: "Confused between an oxygen cylinder and an oxygen concentrator? Learn the exact differences, pros, cons, and which one your patient needs at home.",
    content: "<h2>The Oxygen Dilemma at Home</h2><p>When a doctor prescribes oxygen therapy for a loved one, the immediate confusion is usually: 'Should I rent a cylinder or a concentrator?' Both deliver medical-grade oxygen, but they function very differently.</p><h3>1. Oxygen Cylinders (The Emergency Saver)</h3><p>Cylinders store pressurized pure oxygen. They do not require electricity. <strong>Best for:</strong> Emergency backups, power outages, and high-flow requirements (up to 15 Liters/min).</p><h3>2. Oxygen Concentrators (The Continuous Supplier)</h3><p>Concentrators pull regular air from the room, filter out nitrogen, and deliver pure oxygen. They require constant electricity. <strong>Best for:</strong> Long-term use (COPD, Asthma) and low-flow requirements (1 to 5 Liters/min).</p>",
    author: "Dr. Rajesh Kumar"
  },
  {
    slug: "preventing-bedsores-in-bedridden-patients",
    title: "How to Prevent Bedsores (Pressure Ulcers) in Bedridden Patients",
    excerpt: "Bedsores can turn fatal if ignored. Learn professional home nursing techniques to prevent pressure ulcers for bedridden elderly or ICU patients.",
    content: "<h2>The Silent Danger: Bedsores</h2><p>For patients confined to a bed due to paralysis, stroke, or severe illness, bedsores (pressure ulcers) are a massive risk. They occur when constant pressure cuts off blood supply to the skin.</p><h3>Top Precautions to Take at Home</h3><ul><li><strong>The 2-Hour Rule:</strong> Reposition the patient every 2 hours (Left, right, back).</li><li><strong>Air Mattresses:</strong> Invest in an alternating pressure air mattress (Alpha Bed).</li><li><strong>Moisture Control:</strong> Keep skin dry and use medical barrier creams.</li></ul>",
    author: "Nurse Priya Sharma"
  },
  {
    slug: "post-stroke-physiotherapy-exercises-at-home",
    title: "5 Essential Post-Stroke Physiotherapy Exercises for Home Recovery",
    excerpt: "Stroke recovery depends entirely on neuroplasticity. Discover 5 safe and effective physiotherapy exercises that can be done at home to restore mobility.",
    content: "<h2>The Golden Window of Stroke Recovery</h2><p>The first 3 to 6 months after a stroke are critical for brain rewiring (neuroplasticity). Consistent, daily physiotherapy at home is the only proven way to regain lost motor functions.</p>",
    author: "Dr. Rajesh Kumar"
  },
  {
    slug: "icu-setup-at-home-cost-and-requirements",
    title: "ICU Setup at Home: Complete Guide, Cost, and Requirements",
    excerpt: "Bringing a critical patient home from the hospital? Read our comprehensive checklist on medical equipment, nursing staff, and room preparation for an ICU at home.",
    content: "<h2>Transitioning from Hospital to Home</h2><p>Setting up an ICU at home can drastically reduce medical bills while keeping the patient away from hospital-acquired infections (HAIs). However, it requires meticulous planning.</p>",
    author: "Nurse Priya Sharma"
  }
];

function sendData(table, payload) {
  const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`);
  const postData = JSON.stringify(payload);

  const options = {
    hostname: url.hostname,
    port: 443,
    path: url.pathname,
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      console.log(`Table '${table}' Response Code: ${res.statusCode}`);
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log(`✅ Successfully inserted ${payload.length} records into '${table}'!`);
      } else {
        console.error(`❌ Error inserting into '${table}':`, body);
      }
    });
  });

  req.on('error', (e) => {
    console.error(`❌ Request Error for ${table}:`, e.message);
  });

  req.write(postData);
  req.end();
}

console.log("🚀 Seeding Supabase database tables...");
sendData("stoic_home_care", seoPayload);
sendData("stoic_blogs", blogsPayload);
