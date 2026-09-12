export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("CRITICAL ERROR: Supabase credentials missing from environment variables. Please set SUPABASE_URL and SUPABASE_ANON_KEY.");
}

export async function fetchSupabase(endpoint: string, options: RequestInit = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
        ...(options.headers || {})
      },
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (e) {
    console.error("Supabase fetch error:", e);
    return null;
  }
}

export async function fetchSupabaseCount(endpoint: string, options: RequestInit = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'count=exact',
        ...(options.headers || {})
      },
      next: { revalidate: 60 }
    });

    if (!res.ok) return 0;
    
    const contentRange = res.headers.get('content-range');
    if (contentRange) {
      const parts = contentRange.split('/');
      if (parts.length === 2) return parseInt(parts[1], 10);
    }
    
    return 0;
  } catch (e) {
    console.error("Supabase count fetch error:", e);
    return 0;
  }
}

// Fallback Programmatic SEO Dataset
const LOCATIONS = [
  // Delhi
  "Delhi", "New Delhi", "South Delhi", "North Delhi", "East Delhi", "West Delhi",
  "Greater Kailash", "South Extension", "Safdarjung Enclave", "Hauz Khas", "Vasant Vihar", 
  "Vasant Kunj", "Defense Colony", "New Friends Colony", "Saket", "Dwarka", "Janakpuri", 
  "Rohini", "Pitampura", "Punjabi Bagh", "Rajouri Garden", "Lajpat Nagar", "Green Park",
  "Connaught Place", "Chanakyapuri", "Karol Bagh", "Model Town", "Preet Vihar", "Mayur Vihar",
  // Noida & Greater Noida
  "Noida", "Sector 15 Noida", "Sector 18 Noida", "Sector 62 Noida", "Sector 50 Noida", 
  "Sector 137 Noida", "Sector 76 Noida", "Greater Noida", "Noida Extension", "Greater Noida West",
  // Gurgaon
  "Gurgaon", "DLF Phase 1", "DLF Phase 2", "DLF Phase 3", "DLF Phase 4", "DLF Phase 5", 
  "Golf Course Road", "Sohna Road", "MG Road", "Cyber City",
  // Ghaziabad & Faridabad
  "Ghaziabad", "Indirapuram", "Vaishali", "Vasundhara", "Faridabad"
]; // 55 Locations

const BASE_CATEGORIES = [
  { id: "icu-nursing", cat: "ICU Nursing", title: "ICU Setup & Nursing at Home" },
  { id: "oxygen-cylinder", cat: "Oxygen Cylinder", title: "Oxygen Cylinder on Rent" },
  { id: "physiotherapy", cat: "Physiotherapy", title: "Physiotherapy at Home" },
  { id: "elder-care", cat: "Elder Care", title: "Elder Care & Attendants" },
  { id: "doctor-visit", cat: "Doctor Visit", title: "Doctor Consultation at Home" },
  { id: "medical-equipment", cat: "Medical Equipment", title: "Medical Equipment on Rent" },
];

const DISEASE_CATEGORIES = [
  // ICU & Critical Care
  { id: "copd-icu-setup", cat: "ICU Nursing", title: "COPD & Respiratory Failure ICU Setup", disease: "Chronic Obstructive Pulmonary Disease (COPD) and severe respiratory distress", treatment: "Providing BiPAP/CPAP ventilation, continuous oxygen therapy, nebulization, and 24/7 vitals monitoring by ICU-trained nurses." },
  { id: "stroke-icu-care", cat: "ICU Nursing", title: "Stroke Patient ICU Care", disease: "Post-stroke paralysis, brain hemorrhage, and neurological deficits", treatment: "Continuous cardiac monitoring, PEG tube feeding, DVT prevention, and dedicated stroke-rehab nursing protocols." },
  { id: "cancer-palliative-care", cat: "ICU Nursing", title: "End-Stage Cancer Palliative Care", disease: "Terminal cancer requiring pain management and palliative support", treatment: "Administering pain relief medication via IV, oxygen support, wound care, and compassionate hospice nursing." },
  { id: "tbi-neuro-icu", cat: "ICU Nursing", title: "Traumatic Brain Injury Neuro ICU", disease: "Traumatic Brain Injury (TBI) or post-neurosurgery recovery", treatment: "Glasgow Coma Scale monitoring, seizure precautions, tracheostomy care, and strict infection control." },
  { id: "post-cardiac-icu", cat: "ICU Nursing", title: "Post-Cardiac Surgery ICU Care", disease: "Recovery after CABG (Bypass), heart attacks, or valve replacement", treatment: "ECG monitoring, fluid balance management, wound care for sternal incisions, and cardiac rehabilitation support." },

  // Elder Care
  { id: "dementia-elder-care", cat: "Elder Care", title: "Dementia & Alzheimer's Care", disease: "Dementia, memory loss, and Alzheimer's disease", treatment: "Providing a safe environment, preventing wandering, assisting with daily activities (ADL), and cognitive engagement." },
  { id: "parkinsons-elder-care", cat: "Elder Care", title: "Parkinson's Disease Care", disease: "Parkinson's disease, tremors, and severe mobility restrictions", treatment: "Assisting with feeding, preventing falls, mobility support, and medication management at exact timings." },
  { id: "bedridden-elder-care", cat: "Elder Care", title: "Bedridden Elder Hygiene Care", disease: "Age-related frailty or paralysis causing complete immobility", treatment: "Two-hourly posture changing to prevent bedsores, sponge baths, diaper changes, and skin integrity maintenance." },
  { id: "fall-prevention-care", cat: "Elder Care", title: "Fall Prevention Mobility Care", disease: "Osteoarthritis, osteoporosis, and general weakness in seniors", treatment: "Guarding during walking, bathroom assistance, wheelchair support, and physical strengthening encouragement." },
  
  // Doctor on Call
  { id: "hypertension-doctor", cat: "Doctor Visit", title: "High BP & Hypertension Doctor Visit", disease: "Hypertension crisis and sudden blood pressure spikes", treatment: "Immediate blood pressure assessment, IV medication if required, and tweaking of oral antihypertensive drugs." },
  { id: "diabetic-emergency-doctor", cat: "Doctor Visit", title: "Diabetic Fluctuation Doctor Consult", disease: "Severe Hypoglycemia (low sugar) or Hyperglycemia", treatment: "Stat CBG checking, insulin adjustment, IV fluids for stabilization, and dietary counseling." },
  { id: "viral-fever-doctor", cat: "Doctor Visit", title: "Viral Fever & Infection Doctor Visit", disease: "Acute viral fevers, dengue, malaria, or seasonal infections", treatment: "Diagnostic blood sample collection at home, prescription of antipyretics and antibiotics, and hydration therapy." },

  // Physiotherapy
  { id: "stroke-rehab-physiotherapy", cat: "Physiotherapy", title: "Stroke Rehab Physiotherapy", disease: "Hemiplegia (one-sided paralysis) following a brain stroke", treatment: "Passive range of motion exercises, neuro-muscular electrical stimulation (NMES), and gait retraining." },
  { id: "knee-replacement-physio", cat: "Physiotherapy", title: "Knee/Hip Replacement Physiotherapy", disease: "Post-operative stiffness and pain after Total Knee Replacement (TKR)", treatment: "Progressive weight-bearing, quadriceps strengthening, CPM machine usage, and pain relief modalities." },
  { id: "chest-physiotherapy", cat: "Physiotherapy", title: "Chest Physiotherapy for COPD", disease: "Pneumonia, COPD, or heavy chest congestion", treatment: "Postural drainage, percussion, vibration, and deep breathing exercises to clear lung secretions." },
  { id: "frozen-shoulder-physio", cat: "Physiotherapy", title: "Frozen Shoulder Physiotherapy", disease: "Adhesive capsulitis (Frozen Shoulder) and severe shoulder stiffness", treatment: "Ultrasound therapy, joint mobilization techniques, and stretching exercises to restore full range of motion." },

  // Nursing Care
  { id: "wound-dressing-nursing", cat: "Nursing Care", title: "Post-Surgical Wound Dressing", disease: "Post-operative surgical incisions, diabetic foot ulcers, or severe burns", treatment: "Aseptic cleaning, dead tissue debridement, applying sterile dressings, and monitoring for infection signs." },
  { id: "peg-feeding-nursing", cat: "Nursing Care", title: "PEG Tube & Ryle's Tube Feeding", disease: "Dysphagia (swallowing difficulty) due to stroke or throat cancer", treatment: "Preparation of liquid feeds, administering food via nasal/stomach tubes, flushing to prevent blockages, and aspiration prevention." },
  { id: "catheter-care-nursing", cat: "Nursing Care", title: "Catheterization & Urine Bag Care", disease: "Urinary retention or incontinence in bedridden patients", treatment: "Foley catheter insertion, regular cleaning of the meatus, urine bag emptying, and preventing UTIs." },
  { id: "tracheostomy-care-nursing", cat: "Nursing Care", title: "Tracheostomy Nursing Care", disease: "Airway obstruction requiring a surgical hole in the neck (tracheostomy)", treatment: "Regular suctioning to clear mucus, cleaning the inner cannula, dressing the stoma, and maintaining airway patency." },
  { id: "iv-infusion-nursing", cat: "Nursing Care", title: "IV Injection & Drip Administration", disease: "Severe dehydration, infections needing IV antibiotics, or parenteral nutrition", treatment: "Cannula insertion, monitoring infusion rates, preventing phlebitis, and safe removal of IV lines." }
];

const CATEGORIES = [...BASE_CATEGORIES, ...DISEASE_CATEGORIES];

const FALLBACK_SEO_PAGES: any[] = [];
LOCATIONS.forEach(loc => {
  CATEGORIES.forEach(c => {
    const slug = `${c.id}-at-home-${loc.toLowerCase().replace(/\s+/g, '-')}`;
    
    let contentHtml = "";
    if ('disease' in c && c.disease && 'treatment' in c && c.treatment) {
      contentHtml = `
        <h2>Understanding ${c.disease}</h2>
        <p>Dealing with <strong>${c.disease}</strong> can be incredibly challenging for patients and their families. Symptoms can quickly escalate, requiring professional medical intervention. Traveling to a hospital repeatedly for this condition is not always feasible or safe.</p>
        
        <h3>How We Treat & Manage It at Home in ${loc}</h3>
        <p>Stoic Home Care specializes in managing this condition right in the comfort of your home in ${loc}. Our approach involves:</p>
        <div style="background-color: #f8f9fa; padding: 1.5rem; border-left: 5px solid #0CB8C9; border-radius: 8px; margin: 2rem 0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <p style="margin-bottom: 0; font-size: 1.15rem; color: #0f2240;">
            <strong style="color: #0CB8C9;">✓</strong> <strong>${c.treatment}</strong>
          </p>
        </div>
        
        <h3>Why Choose Stoic Home Care for ${c.title}?</h3>
        <p>We bring hospital-level precision to your bedroom. Our certified nurses, physiotherapists, and doctors are specifically trained to handle emergencies related to this condition, ensuring a swift and empathetic response.</p>
      `;
    } else {
      contentHtml = `<h2>Critical Care & ${c.title} in ${loc}</h2><p>When a family member requires intensive care, moving them to a hospital isn't always the only option. Stoic Home Care provides comprehensive, hospital-grade care right in your apartment or home in ${loc}. Our registered staff are trained in continuous monitoring and protocol compliance.</p><h3>Why Choose Stoic Home Care in ${loc}?</h3><p>We understand the premium healthcare standards expected by families in ${loc}. Our staff undergoes rigorous background checks and clinical training to ensure empathetic, infection-free care at home.</p>`;
    }

    FALLBACK_SEO_PAGES.push({
      slug,
      category: c.cat,
      location: loc,
      page_title: `Best ${c.title} in ${loc} | Stoic Home Care`,
      meta_desc: `Get hospital-grade ${c.title} in ${loc}. 24/7 certified staff to manage ${('disease' in c ? c.disease : c.title)} delivered to your home.`,
      h1_title: `Expert ${c.title} in ${loc}`,
      hero_subtitle: `Professional medical care for ${('disease' in c ? c.disease : 'health conditions')} delivered directly to your home in ${loc}.`,
      content_html: contentHtml
    });
  });
});

const FALLBACK_BLOGS = [
  {
    slug: 'oxygen-cylinder-vs-concentrator-which-is-best-for-home',
    title: 'Oxygen Cylinder vs. Concentrator: Which is Best for Home Care?',
    excerpt: 'Confused between an oxygen cylinder and an oxygen concentrator? Learn the exact differences, pros, cons, and which one your patient needs at home.',
    content: '<h2>The Oxygen Dilemma at Home</h2><p>When a doctor prescribes oxygen therapy for a loved one, the immediate confusion is usually: "Should I rent a cylinder or a concentrator?" Both deliver medical-grade oxygen, but they function very differently.</p><h3>1. Oxygen Cylinders (The Emergency Saver)</h3><p>Cylinders store pressurized pure oxygen. They do not require electricity. <strong>Best for:</strong> Emergency backups, power outages, and high-flow requirements (up to 15 Liters/min).</p><h3>2. Oxygen Concentrators (The Continuous Supplier)</h3><p>Concentrators pull regular air from the room, filter out nitrogen, and deliver pure oxygen. They require constant electricity. <strong>Best for:</strong> Long-term use (COPD, Asthma) and low-flow requirements (1 to 5 Liters/min).</p>',
    author: 'Dr. Rajesh Kumar',
    published_at: new Date().toISOString()
  },
  {
    slug: 'preventing-bedsores-in-bedridden-patients',
    title: 'How to Prevent Bedsores (Pressure Ulcers) in Bedridden Patients',
    excerpt: 'Bedsores can turn fatal if ignored. Learn professional home nursing techniques to prevent pressure ulcers for bedridden elderly or ICU patients.',
    content: '<h2>The Silent Danger: Bedsores</h2><p>For patients confined to a bed due to paralysis, stroke, or severe illness, bedsores (pressure ulcers) are a massive risk. They occur when constant pressure cuts off blood supply to the skin.</p><h3>Top Precautions to Take at Home</h3><ul><li><strong>The 2-Hour Rule:</strong> Reposition the patient every 2 hours (Left, right, back).</li><li><strong>Air Mattresses:</strong> Invest in an alternating pressure air mattress (Alpha Bed).</li><li><strong>Moisture Control:</strong> Keep skin dry and use medical barrier creams.</li></ul>',
    author: 'Nurse Priya Sharma',
    published_at: new Date().toISOString()
  },
  {
    slug: 'post-stroke-physiotherapy-exercises-at-home',
    title: '5 Essential Post-Stroke Physiotherapy Exercises for Home Recovery',
    excerpt: 'Stroke recovery depends entirely on neuroplasticity. Discover 5 safe and effective physiotherapy exercises that can be done at home to restore mobility.',
    content: '<h2>The Golden Window of Stroke Recovery</h2><p>The first 3 to 6 months after a stroke are critical for brain rewiring (neuroplasticity). Consistent, daily physiotherapy at home is the only proven way to regain lost motor functions.</p>',
    author: 'Dr. Rajesh Kumar',
    published_at: new Date().toISOString()
  },
  {
    slug: 'icu-setup-at-home-cost-and-requirements',
    title: 'ICU Setup at Home: Complete Guide, Cost, and Requirements',
    excerpt: 'Bringing a critical patient home from the hospital? Read our comprehensive checklist on medical equipment, nursing staff, and room preparation for an ICU at home.',
    content: '<h2>Transitioning from Hospital to Home</h2><p>Setting up an ICU at home can drastically reduce medical bills while keeping the patient away from hospital-acquired infections (HAIs). However, it requires meticulous planning.</p>',
    author: 'Nurse Priya Sharma',
    published_at: new Date().toISOString()
  }
];

export async function getSeoPage(slug: string) {
  const data = await fetchSupabase(`stoic_home_care?slug=eq.${encodeURIComponent(slug)}&limit=1`);
  if (data && data.length > 0) return data[0];
  const found = FALLBACK_SEO_PAGES.find(p => p.slug === slug);
  return found || null;
}

export async function getAllSeoPages() {
  const data = await fetchSupabase('stoic_home_care?select=slug,page_title,meta_desc,category,location');
  if (data && data.length > 0) return data;
  return FALLBACK_SEO_PAGES;
}

export async function getBlogPosts() {
  const data = await fetchSupabase('stoic_blogs?select=slug,title,excerpt,author,published_at&order=published_at.desc');
  if (data && data.length > 0) return data;
  return FALLBACK_BLOGS;
}

export async function getBlogPost(slug: string) {
  const data = await fetchSupabase(`stoic_blogs?slug=eq.${encodeURIComponent(slug)}&limit=1`);
  if (data && data.length > 0) return data[0];
  const found = FALLBACK_BLOGS.find(b => b.slug === slug);
  return found || null;
}

export async function getAuthorBySlug(slug: string) {
  const data = await fetchSupabase(`stoic_authors?slug=eq.${encodeURIComponent(slug)}&limit=1`);
  if (data && data.length > 0) return data[0];
  return {
    slug: slug,
    name: "Dr. Rajesh Kumar",
    role: "Senior Medical Consultant",
    bio: "Over 15 years of experience in critical care management and home nursing protocols."
  };
}

export async function getReviewsBySlug(slug: string) {
  const data = await fetchSupabase(`stoic_reviews?service_slug=eq.${encodeURIComponent(slug)}&order=created_at.desc`);
  return data || [];
}

export async function getQnA(location: string, category: string) {
  const data = await fetchSupabase(`stoic_qna?location=eq.${encodeURIComponent(location)}&category=eq.${encodeURIComponent(category)}&status=eq.published&order=created_at.desc`);
  return data || [];
}

export async function getPagesByLocation(location: string) {
  const data = await fetchSupabase(`stoic_home_care?location=eq.${encodeURIComponent(location)}`);
  if (data && data.length > 0) return data;
  const locSlug = location.toLowerCase().replace(/\s+/g, '-');
  return FALLBACK_SEO_PAGES.filter(p => p.location.toLowerCase() === location.toLowerCase() || p.location.toLowerCase().replace(/\s+/g, '-') === locSlug);
}

export async function getLinkDictionary() {
  const dictionary: Record<string, string> = {
    'ICU Setup at Home': '/category/icu-setup',
    'ICU Setup': '/category/icu-setup',
    'Oxygen Cylinder': '/category/oxygen-cylinder',
    'Oxygen Concentrator': '/category/oxygen-concentrator',
    'Home Nursing': '/category/home-nursing',
    'Elder Care': '/category/elder-care',
    'Patient Care': '/category/patient-care',
    'Physiotherapy': '/category/physiotherapy',
    'Stroke Patient Care': '/category/patient-care',
  };
  const seoPages = await getAllSeoPages();
  if (seoPages) {
    seoPages.forEach((page: any) => {
      if (page.category) {
        const catSlug = page.category.toLowerCase().replace(/\s+/g, '-');
        dictionary[page.category] = `/category/${catSlug}`;
      }
    });
  }
  return dictionary;
}

const FALLBACK_SERVICES = [
  {
    id: 'static-1',
    title: 'ICU Setup @ Home',
    category: 'Critical Care',
    description: 'Complete ICU infrastructure with ventilators, monitors and critical care nurses.',
    image: '/images/equip.avif'
  },
  {
    id: 'static-2',
    title: 'ICU Trained Nursing',
    category: 'Nursing',
    description: 'Certified nurses for post-op care, IV therapy, wound management and monitoring.',
    image: '/images/nurse.avif'
  },
  {
    id: 'static-3',
    title: 'Old Age Care',
    category: 'Elder Care',
    description: 'Compassionate full-time care for seniors including daily assistance and health monitoring.',
    image: '/images/old.jpg'
  },
  {
    id: 'static-4',
    title: 'Mother & Baby Care',
    category: 'Maternity',
    description: 'Post-natal support for new mothers and neonatal care for newborns by specialists.',
    image: '/images/child.jpg'
  },
  {
    id: 'static-5',
    title: 'Doctor on Call',
    category: 'Doctor Visit',
    description: 'Board-certified physicians visiting your home for diagnosis, prescriptions and follow-ups.',
    image: '/images/doctor_03.jpg'
  },
  {
    id: 'static-6',
    title: 'Physiotherapy @ Home',
    category: 'Rehabilitation',
    description: 'Expert physiotherapists for stroke rehab, post-surgical recovery and pain management.',
    image: '/images/physio.webp'
  },
  {
    id: 'static-7',
    title: 'Nursing Attendant',
    category: 'Nursing',
    description: 'Trained nursing attendants providing round-the-clock care and support for patients.',
    image: '/images/nurse.webp'
  },
  {
    id: 'static-8',
    title: 'Covid Care @ Home',
    category: 'Specialised',
    description: 'Specialised care for Covid-19 patients including oxygen therapy and monitoring.',
    image: '/images/ab-1.avif'
  },
  {
    id: 'static-9',
    title: 'Psychologist @ Home',
    category: 'Mental Health',
    description: 'Qualified psychologists providing therapy and counselling in the comfort of your home.',
    image: '/images/ab-2.avif'
  }
];

export async function getServices() {
  const data = await fetchSupabase('stoic_services?order=id.desc&limit=6');
  if (data && data.length > 0) return data;
  return FALLBACK_SERVICES.slice(0, 6);
}

export async function getAllServices() {
  const data = await fetchSupabase('stoic_services?order=id.desc&limit=1000');
  if (data && data.length > 0) return data;
  return FALLBACK_SERVICES;
}

export async function getEquipment() {
  const data = await fetchSupabase('stoic_equipment?order=id.desc&limit=8');
  return data || [];
}
