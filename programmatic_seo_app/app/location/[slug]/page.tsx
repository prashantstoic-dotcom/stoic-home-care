import { getAllSeoPages } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import HomeEnquiryForm from '@/components/HomeEnquiryForm';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const cityName = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `Best Home Care Services in ${cityName} | Stoic Home Care`,
    description: `Discover top-rated ICU nursing, physiotherapy, elder care, and medical equipment rentals in ${cityName}. 24/7 support available.`,
    alternates: { canonical: `/location/${params.slug}` },
    openGraph: {
      title: `Best Home Care Services in ${cityName} | Stoic Home Care`,
      description: `Discover top-rated ICU nursing, physiotherapy, elder care, and medical equipment rentals in ${cityName}. 24/7 support available.`,
      type: "website",
      images: [
        {
          url: "/images/carousel-1.avif",
          width: 1200,
          height: 630,
          alt: `Home Care Services in ${cityName}`,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Best Home Care Services in ${cityName} | Stoic Home Care`,
      description: `Discover top-rated ICU nursing, physiotherapy, elder care, and medical equipment rentals in ${cityName}. 24/7 support available.`,
      images: ["/images/carousel-1.avif"],
    }
  };
}

export default async function LocationHubPage({ params }: { params: { slug: string } }) {
  const citySlug = params.slug.toLowerCase();
  const cityName = citySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  // Fetch all pages and filter by location
  const allPages = await getAllSeoPages();
  const locationPages = allPages.filter((p: any) => {
    const loc = p.location || '';
    const locSlug = loc.toLowerCase().replace(/\s+/g, '-');
    return locSlug === citySlug || loc.toLowerCase() === cityName.toLowerCase();
  });

  if (locationPages.length === 0) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalOrganization"],
    "name": `Stoic Home Care ${cityName}`,
    "url": `https://stoiccare.in/location/${params.slug}`,
    "logo": "https://stoiccare.in/logo.png",
    "description": `Professional medical care and equipment delivered directly to your home in ${cityName}.`,
    "telephone": "+91-7668232867",
    "areaServed": {
      "@type": "City",
      "name": cityName
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Home Care Services in ${cityName}`,
      "itemListElement": locationPages.map((page: any, index: number) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": page.page_title,
          "url": `https://stoiccare.in/service/${page.slug}`
        },
        "position": index + 1
      }))
    }
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="contact-hero-section" aria-label="Location Hub Hero">
        <div className="container position-relative" style={{ zIndex: 2, paddingBottom: '25px' }}>
          <div className="row align-items-center g-5 py-5 text-center">
            <div className="col-12" data-aos="fade-up">
              <h1 className="hero-title text-white" style={{ fontSize: '3.5rem', fontWeight: 800 }}>Home Care Services in {cityName}</h1>
              <p className="hero-sub text-white-50 mt-3" style={{ fontSize: '1.2rem' }}>Professional medical care and equipment delivered directly to your home in {cityName}.</p>
            </div>
          </div>
        </div>
      </header>

      <section className="section-pad bg-light">
        <div className="container">
          {/* Visual Breadcrumbs */}
          <nav aria-label="breadcrumb" className="mb-5">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item"><Link href="/services">Locations</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{cityName}</li>
            </ol>
          </nav>

          <div className="row g-4">
            {locationPages.map((page: any, index: number) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm border-0 hover-lift" style={{ transition: 'transform 0.2s ease, box-shadow 0.2s ease', borderRadius: '12px' }}>
                  <div className="card-body p-4">
                    <span className="badge bg-opacity-10 text-teal mb-3" style={{ backgroundColor: 'rgba(12, 184, 201, 0.1)', color: '#0CB8C9', padding: '0.5rem 1rem', borderRadius: '50px' }}>
                      {page.category || 'Service'}
                    </span>
                    <h3 className="h5 card-title fw-bold mt-2">
                      <Link href={`/service/${page.slug}`} className="text-dark text-decoration-none hover-primary">
                        {page.page_title}
                      </Link>
                    </h3>
                    <p className="text-muted small mt-3" style={{ lineHeight: 1.6 }}>{page.meta_desc}</p>
                  </div>
                  <div className="card-footer bg-white border-0 p-4 pt-0">
                    <Link href={`/service/${page.slug}`} className="btn btn-outline-info w-100" style={{ borderRadius: '8px', fontWeight: 600 }}>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section className="section-pad bg-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center mb-5">
              <h2 className="section-title">Need Help in {cityName}?</h2>
              <p className="section-sub mx-auto">Fill the form below and our care coordinator in {cityName} will reach out to you within an hour.</p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-7 bg-light p-5 rounded-4 shadow-sm border border-secondary border-opacity-10">
              <HomeEnquiryForm />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
