import fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...val] = line.split('=');
  if (key && val) env[key.trim()] = val.join('=').trim();
});

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL;
const SUPABASE_KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY;

const services = [
  // Elder Care
  { title: "Dementia Care Assistance", category: "Elder Care", description: "Specialized 24/7 care for seniors suffering from Alzheimer's and Dementia, ensuring a safe, familiar environment.", image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80" },
  { title: "Parkinson's Disease Care", category: "Elder Care", description: "Expert caregivers trained to assist with mobility, medication management, and daily living for Parkinson's patients.", image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=800&q=80" },
  { title: "Post-Stroke Elder Care", category: "Elder Care", description: "Comprehensive rehabilitation support and daily assistance for elderly patients recovering from a stroke.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80" },
  { title: "Elderly Mobility Assistance", category: "Elder Care", description: "Support with walking, transferring from bed to wheelchair, and fall prevention for seniors with limited mobility.", image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80" },
  { title: "Bedridden Patient Care", category: "Elder Care", description: "Complete hygiene, feeding, and bedsore prevention care for entirely bedridden seniors.", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" },
  { title: "Senior Companionship Services", category: "Elder Care", description: "Emotional support, engaging activities, and companionship to prevent loneliness and depression in the elderly.", image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&w=800&q=80" },
  { title: "Elderly Nutrition & Feeding", category: "Elder Care", description: "Meal preparation according to dietary restrictions, and feeding assistance for seniors who cannot feed themselves.", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80" },
  { title: "Palliative Care for Seniors", category: "Elder Care", description: "Compassionate end-of-life care focusing on pain relief, comfort, and emotional support for both patient and family.", image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80" },
  { title: "Hospice Care at Home", category: "Elder Care", description: "Professional hospice care bringing comfort and dignity to terminally ill elderly patients in their own homes.", image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80" },
  { title: "Senior Hygiene & Bathing", category: "Elder Care", description: "Respectful assistance with bathing, grooming, toileting, and maintaining personal hygiene for seniors.", image: "https://images.unsplash.com/photo-1606403064227-2c9dd7b43a8b?auto=format&fit=crop&w=800&q=80" },
  { title: "Medication Management", category: "Elder Care", description: "Strict schedule adherence and administration of daily medications for seniors to prevent missed doses.", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ad?auto=format&fit=crop&w=800&q=80" },
  { title: "Post-Surgery Elder Recovery", category: "Elder Care", description: "Specialized post-operative care including wound monitoring and mobility support for seniors.", image: "https://images.unsplash.com/photo-1551076805-e166946c9ebf?auto=format&fit=crop&w=800&q=80" },
  { title: "Elderly Diabetic Care", category: "Elder Care", description: "Blood sugar monitoring, insulin administration support, and diabetic diet management for seniors.", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80" },
  { title: "Arthritis Care Assistance", category: "Elder Care", description: "Pain management support and gentle assistance for seniors suffering from severe arthritis.", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80" },
  { title: "24-Hour Live-in Elder Care", category: "Elder Care", description: "Round-the-clock live-in caregivers providing continuous monitoring and support for seniors.", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80" },
  
  // Nursing Care
  { title: "ICU Setup at Home", category: "Nursing Care", description: "Complete hospital-like ICU infrastructure with ventilators, bipap machines, and 24/7 critical care nurses.", image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=800&q=80" },
  { title: "Tracheostomy Care", category: "Nursing Care", description: "Expert nursing care for patients with tracheostomy tubes, including suctioning, cleaning, and monitoring.", image: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&w=800&q=80" },
  { title: "IV Therapy & Injections", category: "Nursing Care", description: "Safe administration of intravenous fluids, antibiotics, and critical injections by certified nurses at home.", image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=800&q=80" },
  { title: "Wound Dressing & Management", category: "Nursing Care", description: "Advanced wound care for surgical wounds, bedsores, and diabetic ulcers by skilled nursing staff.", image: "https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&w=800&q=80" },
  { title: "Catheterization Services", category: "Nursing Care", description: "Professional insertion, removal, and maintenance of urinary catheters at home with strict infection control.", image: "https://images.unsplash.com/photo-1551076805-e166946c9ebf?auto=format&fit=crop&w=800&q=80" },
  { title: "Post-Natal Nursing Care", category: "Nursing Care", description: "Specialized care for new mothers recovering from C-sections, including vital monitoring and wound care.", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80" },
  { title: "Neurological Nursing Care", category: "Nursing Care", description: "Specialized nursing for patients with severe neurological disorders requiring constant medical supervision.", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80" },
  { title: "Oncology Nursing Support", category: "Nursing Care", description: "Compassionate nursing care for cancer patients, managing chemo side effects and providing pain relief at home.", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80" }
];

async function seed() {
  for (const svc of services) {
    const res = await fetch(\\/rest/v1/stoic_services\, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': \Bearer \\,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        title: svc.title,
        description: svc.description,
        category: svc.category,
        image_url: svc.image
      })
    });
    
    if (res.ok) {
      console.log('Added:', svc.title);
    } else {
      console.error('Failed:', svc.title, await res.text());
    }
  }
}

seed();
