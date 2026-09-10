import { getAllSeoPages } from '@/lib/supabase';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Service Areas & Locations in Delhi NCR | Stoic Home Care',
  description: 'Browse our complete list of home care service locations across Delhi, Noida, Gurgaon, Ghaziabad, and Faridabad.',
  alternates: { canonical: '/locations' }
};

export const revalidate = 3600;

export default async function LocationsDirectoryPage() {
  const pages = await getAllSeoPages();

  // Group pages by location
  const groupedByLocation: Record<string, any[]> = {};
  pages.forEach((p: any) => {
    const loc = p.location || 'Delhi NCR';
    if (!groupedByLocation[loc]) groupedByLocation[loc] = [];
    groupedByLocation[loc].push(p);
  });

  // Sort locations alphabetically
  const sortedLocations = Object.keys(groupedByLocation).sort();

  return (
    <>
      <div className="w-full bg-[#1a3a6b] text-white py-12 md:py-20 relative overflow-hidden mt-[76px]">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/pattern.png')] mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center text-sm font-bold text-[#4ecdc4] uppercase tracking-wider mb-4 bg-white/10 px-3 py-1 rounded-full border border-white/20">
            <MapPin className="w-4 h-4 mr-2" /> Areas We Serve
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Our Service <span className="text-[#4ecdc4]">Locations</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Stoic Home Care provides professional ICU, nursing, and elder care across 50+ locations in the Delhi NCR region. Find services near you.
          </p>
        </div>
      </div>

      <section className="py-16 bg-[#f8fbff]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedLocations.map(loc => {
              const locationSlug = loc.toLowerCase().replace(/\s+/g, '-');
              const services = groupedByLocation[loc];
              
              return (
                <div key={loc} className="bg-white rounded-2xl p-6 shadow-lg border border-[#e2e8f0] hover:shadow-xl transition-shadow">
                  <h2 className="text-2xl font-bold text-[#0f2240] mb-4 flex items-center border-b pb-3">
                    <MapPin className="w-6 h-6 text-[#2196d3] mr-2 shrink-0" />
                    <Link href={`/location/${locationSlug}`} className="hover:text-[#4ecdc4] transition-colors">
                      {loc}
                    </Link>
                  </h2>
                  <ul className="space-y-3 mb-6">
                    {services.slice(0, 5).map((svc: any) => (
                      <li key={svc.slug}>
                        <Link href={`/service/${svc.slug}`} className="text-[#6b82a3] hover:text-[#2196d3] flex items-start text-sm transition-colors group">
                          <ArrowRight className="w-4 h-4 mr-2 text-[#4ecdc4] shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                          {svc.page_title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/location/${locationSlug}`} className="text-[#2196d3] font-bold text-sm inline-flex items-center hover:underline">
                    View all {services.length} services in {loc} <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
