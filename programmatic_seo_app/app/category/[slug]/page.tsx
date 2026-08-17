import { getAllSeoPages } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import HomeEnquiryForm from '@/components/HomeEnquiryForm';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const catName = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `${catName} Services | Stoic Home Care Locations`,
    description: `Explore our top-rated ${catName} services across various cities. Professional home care you can trust.`,
    alternates: { canonical: `/category/${params.slug}` },
    openGraph: {
      title: `${catName} Services | Stoic Home Care Locations`,
      description: `Explore our top-rated ${catName} services across various cities. Professional home care you can trust.`,
      type: "website",
      images: [
        {
          url: "/images/carousel-2.avif",
          width: 1200,
          height: 630,
          alt: `${catName} Services`,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${catName} Services | Stoic Home Care Locations`,
      description: `Explore our top-rated ${catName} services across various cities. Professional home care you can trust.`,
      images: ["/images/carousel-2.avif"],
    }
  };
}

export default async function CategoryHubPage({ params }: { params: { slug: string } }) {
  const catSlug = params.slug.toLowerCase();
  const catName = catSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  // Fetch all pages and filter by category (loose match)
  const allPages = await getAllSeoPages();
  const categoryPages: any[] = [];
  let actualCategoryName = catName;

  allPages.forEach((p: any) => {
    const c = p.category || '';
    const cSlug = c.toLowerCase().replace(/\s+/g, '-');
    
    if (catSlug.includes(cSlug) || cSlug.includes(catSlug)) {
      categoryPages.push(p);
      actualCategoryName = c; // Save the exact case used in DB
    }
  });

  if (categoryPages.length === 0) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${actualCategoryName} Services | Stoic Home Care Locations`,
    "description": `Explore our top-rated ${actualCategoryName} services across various cities. Professional home care you can trust.`,
    "url": `https://stoiccare.in/category/${params.slug}`,
    "hasPart": categoryPages.map((page: any) => ({
      "@type": "WebPage",
      "name": page.page_title,
      "url": `https://stoiccare.in/service/${page.slug}`,
      "description": page.meta_desc
    }))
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="contact-hero-section" aria-label="Category Silo Hero">
        <div className="container position-relative" style={{ zIndex: 2, paddingBottom: '25px' }}>
          <div className="row align-items-center g-5 py-5 text-center">
            <div className="col-12" data-aos="fade-up">
              <h1 className="hero-title text-white" style={{ fontSize: '3.5rem', fontWeight: 800 }}>{actualCategoryName} Services</h1>
              <p className="hero-sub text-white-50 mt-3" style={{ fontSize: '1.2rem' }}>Professional medical care delivered directly to your home across multiple locations.</p>
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
              <li className="breadcrumb-item"><Link href="/services">Services</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{actualCategoryName}</li>
            </ol>
          </nav>

          <div className="row g-4">
            {categoryPages.map((page: any, index: number) => (
              <div key={index} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm border-0 hover-lift" style={{ transition: 'transform 0.2s ease, box-shadow 0.2s ease', borderRadius: '12px' }}>
                  <div className="card-body p-4">
                    <span className="badge bg-opacity-10 text-teal mb-3" style={{ backgroundColor: 'rgba(12, 184, 201, 0.1)', color: '#0CB8C9', padding: '0.5rem 1rem', borderRadius: '50px' }}>
                      <i className="fa-solid fa-location-dot me-2"></i>{page.location || 'Location'}
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
              <h2 className="section-title">Need {actualCategoryName}?</h2>
              <p className="section-sub mx-auto">Fill the form below and our care coordinator will reach out to you within an hour to confirm availability in your area.</p>
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
