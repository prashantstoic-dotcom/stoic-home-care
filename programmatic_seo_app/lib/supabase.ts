export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn("Supabase credentials missing from environment variables!");
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
  "Delhi", "Noida", "Greater Noida", "Gurgaon", "Ghaziabad", "Faridabad",
  "Greater Kailash", "South Extension", "Safdarjung Enclave", "Hauz Khas",
  "Vasant Vihar", "Vasant Kunj", "Defense Colony", "New Friends Colony",
  "Saket", "Dwarka", "Indirapuram", "Sector 15 Noida", "Sector 62 Noida"
];

const CATEGORIES = [
  { id: "icu-nursing", cat: "ICU Nursing", title: "ICU Setup & Nursing at Home" },
  { id: "oxygen-cylinder", cat: "Oxygen Cylinder", title: "Oxygen Cylinder on Rent" },
  { id: "physiotherapy", cat: "Physiotherapy", title: "Physiotherapy at Home" },
  { id: "elder-care", cat: "Elder Care", title: "Elder Care & Attendants" }
];

const FALLBACK_SEO_PAGES: any[] = [];
LOCATIONS.forEach(loc => {
  CATEGORIES.forEach(c => {
    const slug = `${c.id}-at-home-${loc.toLowerCase().replace(/\s+/g, '-')}`;
    FALLBACK_SEO_PAGES.push({
      slug,
      category: c.cat,
      location: loc,
      page_title: `Best ${c.title} in ${loc} | Stoic Home Care`,
      meta_desc: `Get hospital-grade ${c.title} in ${loc}. 24/7 certified staff and equipment delivered to your home by Stoic Home Care.`,
      h1_title: `Expert ${c.title} in ${loc}`,
      hero_subtitle: `Professional medical care and equipment delivered directly to your home in ${loc}.`,
      content_html: `<h2>Critical Care & ${c.title} in ${loc}</h2><p>When a family member requires intensive care, moving them to a hospital isn't always the only option. Stoic Home Care provides comprehensive, hospital-grade care right in your apartment or home in ${loc}. Our registered staff are trained in continuous monitoring and protocol compliance.</p><h3>Why Choose Stoic Home Care in ${loc}?</h3><p>We understand the premium healthcare standards expected by families in ${loc}. Our staff undergoes rigorous background checks and clinical training to ensure empathetic, infection-free care at home.</p>`
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

export async function getServices() {
  const data = await fetchSupabase('stoic_services?order=id.desc');
  return data || [];
}

export async function getEquipment() {
  const data = await fetchSupabase('stoic_equipment?order=id.desc');
  return data || [];
}
