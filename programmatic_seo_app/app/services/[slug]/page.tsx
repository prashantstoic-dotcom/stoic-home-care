import { getAllServices } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

function slugify(text: string) {
  return text.toString().toLowerCase().trim().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((svc: any) => ({
    slug: slugify(svc.title),
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const services = await getAllServices();
  const service = services.find((s: any) => slugify(s.title) === params.slug);

  if (!service) return { title: 'Service Not Found | Stoic Home Care' };

  return {
    title: `${service.title} at Home in Noida & Delhi NCR | Stoic Home Care`,
    description: service.description,
    alternates: { canonical: `/services/${params.slug}` },
    openGraph: {
      title: `${service.title} | Stoic Home Care`,
      description: service.description,
      images: [service.image_url || '/images/carousel-1.avif'],
    }
  };
}

export default async function ServiceDetailsPage({ params }: { params: { slug: string } }) {
  const services = await getAllServices();
  const service = services.find((s: any) => slugify(s.title) === params.slug);

  if (!service) {
    notFound();
  }

  const imageUrl = service.image_url || (service.image ? (service.image.startsWith('/') ? service.image : `/uploads/services/${service.image}`) : '/images/carousel-1.avif');

  const benefits = [
    "24/7 Professional Medical Support",
    "Verified & Certified Caregivers",
    "Affordable & Transparent Pricing",
    "Fast Setup Within 2 Hours",
    "Regular Doctor Consultations",
    "High Standard of Hygiene"
  ];

  return (
    <>
      <div className="w-full bg-[#1a3a6b] text-white py-12 md:py-20 relative overflow-hidden mt-[76px]">
        <div className="absolute inset-0 opacity-20 bg-[url('/images/pattern.png')] mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="inline-flex items-center text-sm font-bold text-[#4ecdc4] uppercase tracking-wider mb-4 bg-white/10 px-3 py-1 rounded-full border border-white/20">
            {service.category || 'Home Care Service'}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            {service.title} <span className="text-[#4ecdc4]">At Home</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-8">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="inline-flex items-center px-8 py-4 rounded-full font-bold text-[#0f2240] bg-gradient-to-r from-[#4ecdc4] to-[#2196d3] shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-lg no-underline">
              <Phone className="w-5 h-5 mr-2" /> Book {service.title}
            </Link>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image src={imageUrl} alt={service.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
            </div>
            
            <div>
              <h2 className="text-3xl font-extrabold text-[#0f2240] mb-6">Why Choose Our {service.title}?</h2>
              <p className="text-lg text-[#6b82a3] mb-8">
                Stoic Home Care provides hospital-grade medical support in the comfort of your home. Our experts in <strong>{service.title}</strong> ensure patient dignity, fast recovery, and complete peace of mind for the family.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#2196d3] shrink-0 mt-0.5" />
                    <span className="font-semibold text-[#0f2240]">{b}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#f8fbff] border border-[#e2e8f0] rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1a3a6b] to-[#2196d3] flex items-center justify-center text-white shrink-0">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0f2240] mb-2">Need Immediate Assistance?</h4>
                  <p className="text-[#6b82a3] mb-4">Our medical coordinators are available 24/7 to help you.</p>
                  <a href="tel:+917668232867" className="text-[#2196d3] font-bold hover:underline inline-flex items-center">
                    Call +91 76682 32867 <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
