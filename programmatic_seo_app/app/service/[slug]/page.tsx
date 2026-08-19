import { getSeoPage, getQnA, getReviewsBySlug, getPagesByLocation, getLinkDictionary } from '@/lib/supabase';
import { ScarcityEngine } from '@/lib/scarcity';
import { AutoLinker } from '@/lib/autolinker';
import { generateMedicalSchema } from '@/lib/schemaGenerator';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import HomeEnquiryForm from '@/components/HomeEnquiryForm';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const seoData = await getSeoPage(params.slug);
  if (!seoData) return { title: 'Service Not Found' };

  return {
    title: seoData.page_title || 'Expert Home Care Services',
    description: seoData.meta_desc || '',
    alternates: { canonical: `/service/${params.slug}` },
    openGraph: {
      title: seoData.page_title || 'Expert Home Care Services',
      description: seoData.meta_desc || '',
      type: "website",
      images: [
        {
          url: "/images/clinic_03.jpg",
          width: 1200,
          height: 630,
          alt: seoData.page_title || 'Expert Home Care Services',
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.page_title || 'Expert Home Care Services',
      description: seoData.meta_desc || '',
      images: ["/images/clinic_03.jpg"],
    }
  };
}

export default async function ServiceLandingPage({ params }: { params: { slug: string } }) {
  const seoData = await getSeoPage(params.slug);
  if (!seoData) {
    notFound();
  }

  const h1Title = seoData.h1_title || seoData.page_title;
  const heroSub = seoData.hero_subtitle || '';
  let htmlBody = seoData.content_html || '';
  const location = seoData.location || 'Delhi NCR';
  const category = seoData.category || 'Service';

  // 1. Scarcity & Urgency
  const liveInventory = ScarcityEngine.getLiveInventory(location, category);
  const urgencyMessage = ScarcityEngine.getUrgencyMessage(liveInventory, location, category);

  // 2. SEO Content processing
  const altSuffix = `${h1Title} in ${location}`;
  htmlBody = AutoLinker.optimizeImages(htmlBody, altSuffix);
  
  const dictionary = await getLinkDictionary();
  htmlBody = AutoLinker.linkify(htmlBody, dictionary);
  htmlBody = AutoLinker.generateTOC(htmlBody);

  // 3. Schema Data
  const serviceId = `https://stoiccare.in/#service-${params.slug}`;
  const customSchema: any[] = [{
    "@context": "https://schema.org/",
    "@type": "Service",
    "@id": serviceId,
    "serviceType": h1Title,
    "provider": {
      "@id": "https://stoiccare.in/#organization",
      "@type": "MedicalBusiness",
      "name": "Stoic Home Care"
    },
    "areaServed": {
      "@type": "City",
      "name": location
    },
    "description": seoData.meta_desc || '',
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/LimitedAvailability",
      "inventoryLevel": {
        "@type": "QuantitativeValue",
        "value": liveInventory
      },
      "priceCurrency": "INR",
      "price": "Call for Availability"
    }
  }];

  const qna = await getQnA(location, category);
  if (qna.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `https://stoiccare.in/#faq-${params.slug}`,
      "about": { "@id": serviceId },
      "mainEntity": qna.map((q: any) => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.answer
        }
      }))
    };
    customSchema.push(faqSchema);
  }

  const reviews = await getReviewsBySlug(params.slug);
  if (reviews.length > 0) {
    const reviewSchemas = reviews.map((rev: any) => ({
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": { "@type": "Service", "name": h1Title },
      "author": { "@type": "Person", "name": rev.reviewer_name },
      "reviewRating": { "@type": "Rating", "ratingValue": rev.rating, "bestRating": "5" },
      "reviewBody": rev.review_text
    }));
    customSchema.push(...reviewSchemas);
  }

  // Add BreadcrumbList Schema
  customSchema.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://stoiccare.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": category,
        "item": `https://stoiccare.in/category/${category.toLowerCase().replace(/\s+/g, '-')}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": location,
        "item": `https://stoiccare.in/location/${location.toLowerCase().replace(/\s+/g, '-')}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": h1Title,
        "item": `https://stoiccare.in/service/${params.slug}`
      }
    ]
  });

  // Inject Advanced Knowledge Graph / E-E-A-T Medical Schema
  customSchema.push(
    generateMedicalSchema(
      h1Title,
      `https://stoiccare.in/service/${params.slug}`,
      seoData.meta_desc || ''
    )
  );

  const relatedPages = await getPagesByLocation(location);

  return (
    <main id="main-content">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes livePulse {
          0% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(220, 53, 69, 0); }
          100% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0); }
        }
        .seo-content-block { font-size: 1.1rem; line-height: 1.8; color: #444; }
        .seo-content-block h2 { color: var(--dark); margin-top: 2rem; margin-bottom: 1rem; font-weight: 700; }
        .seo-content-block p { margin-bottom: 1.5rem; }
      `}} />

      {/* ══ DYNAMIC HERO ══ */}
      <header className="contact-hero-section position-relative" aria-label="Service Page Hero">
        <div className="container position-relative" style={{ zIndex: 2, paddingBottom: '25px' }}>
          <div className="row align-items-center g-5 py-5">
            <div className="col-lg-7" data-aos="fade-right">
              <div className="hero-badge" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', padding: '0.4rem 1rem', borderRadius: '50px', marginBottom: '1rem', fontSize: '0.9rem', color: '#fff' }}><i className="fa-solid fa-location-dot me-2"></i>Available in {location}</div>
              <h1 className="hero-title text-white" style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem' }}>{h1Title}</h1>
              <p className="hero-sub text-white-50" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>{heroSub}</p>
              
              <div className="mt-3 mb-4 d-inline-flex align-items-center bg-danger bg-opacity-10 border border-danger border-opacity-25 rounded-pill px-4 py-2 shadow-sm" style={{ backdropFilter: 'blur(4px)' }}>
                  <div className="pulse-dot bg-danger rounded-circle me-3" style={{ width: '12px', height: '12px', animation: 'livePulse 2s infinite' }}></div>
                  <span className="text-danger fw-bold fs-6">{urgencyMessage}</span>
              </div>
              
              <div className="hero-btns d-flex gap-3 flex-wrap">
                <Link href="/contact" className="btn-primary-grad px-4 py-3 text-white text-decoration-none" style={{ borderRadius: '50px', fontWeight: 600 }}>
                  <i className="fa-solid fa-calendar-check me-2"></i>Book Now
                </Link>
                <a href="tel:+917668232867" className="btn-outline-white px-4 py-3 text-white text-decoration-none" style={{ borderRadius: '50px', fontWeight: 600, border: '2px solid rgba(255,255,255,0.5)' }}>
                  <i className="fa-solid fa-phone me-2"></i>Call +91 76682 32867
                </a>
              </div>
            </div>
            <div className="col-lg-5 hero-img-side text-center" data-aos="fade-left">
              <Image src="/images/clinic_03.jpg" className="img-fluid rounded-4 shadow-lg" alt={h1Title} width={600} height={400} priority style={{ border: '4px solid white', maxWidth: '100%', height: 'auto' }} />
            </div>
          </div>
        </div>
      </header>

      {/* ══ DYNAMIC CONTENT ══ */}
      <section className="section-pad">
        <div className="container">
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item"><Link href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}>{category}</Link></li>
              <li className="breadcrumb-item"><Link href={`/location/${location.toLowerCase().replace(/\s+/g, '-')}`}>{location}</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{h1Title}</li>
            </ol>
          </nav>

          <div className="row justify-content-center">
            <div className="col-lg-9">
              <article className="seo-content-block" data-aos="fade-up" dangerouslySetInnerHTML={{ __html: htmlBody }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ LIVE CUSTOMER REVIEWS ══ */}
      {reviews.length > 0 && (
        <section className="section-pad bg-white">
          <div className="container">
            <div className="row mb-5">
              <div className="col-12 text-center">
                <h2 className="h3 fw-bold">What Our Clients Say</h2>
                <p className="text-muted">Real experiences from families who trusted Stoic Home Care.</p>
              </div>
            </div>
            <div className="row g-4 justify-content-center">
              {reviews.slice(0, 3).map((review: any, i: number) => (
                <div key={i} className="col-md-6 col-lg-4">
                  <div className="card h-100 border border-light bg-light rounded shadow-sm p-4">
                    <div className="mb-3 text-warning">
                      {[...Array(5)].map((_, idx) => (
                        <i key={idx} className={`fa-${idx < parseInt(review.rating) ? 'solid' : 'regular'} fa-star`}></i>
                      ))}
                    </div>
                    <p className="fst-italic text-muted mb-4">"{review.review_text}"</p>
                    <div className="d-flex align-items-center mt-auto">
                      <div className="bg-teal text-white rounded-circle d-flex align-items-center justify-content-center fw-bold me-3" style={{ width: '40px', height: '40px', background: '#0CB8C9' }}>
                        {review.reviewer_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="h6 mb-0 fw-bold">{review.reviewer_name}</h4>
                        <small className="text-muted"><i className="fa-solid fa-location-dot me-1"></i> {review.location}</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ LOCAL COMMUNITY Q&A ══ */}
      <section className="section-pad bg-light">
        <div className="container">
          <div className="row mb-5 align-items-center">
            <div className="col-md-8 text-center text-md-start">
              <h2 className="h3 fw-bold">Community Q&A - {location}</h2>
              <p className="text-muted mb-0">Common questions about {category} answered by our experts and local community.</p>
            </div>
            <div className="col-md-4 text-center text-md-end mt-3 mt-md-0">
              <Link href="/contact" className="btn btn-outline-info">
                <i className="fa-solid fa-comments me-2"></i>Ask a Question
              </Link>
            </div>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {qna.length > 0 ? (
                <div className="accordion shadow-sm" id="qnaAccordion">
                  {qna.map((q: any, i: number) => (
                    <div key={i} className="accordion-item border-0 border-bottom">
                      <h3 className="accordion-header" id={`headingQnA${i}`}>
                        <button className={`accordion-button ${i !== 0 ? 'collapsed' : ''} bg-white fw-bold`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapseQnA${i}`} aria-expanded={i === 0} aria-controls={`collapseQnA${i}`}>
                          {q.question}
                        </button>
                      </h3>
                      <div id={`collapseQnA${i}`} className={`accordion-collapse collapse ${i === 0 ? 'show' : ''}`} aria-labelledby={`headingQnA${i}`} data-bs-parent="#qnaAccordion">
                        <div className="accordion-body bg-white text-muted">
                          {q.answer.split('\n').map((line: string, lidx: number) => <span key={lidx}>{line}<br/></span>)}
                          <div className="mt-3 small text-secondary d-flex align-items-center">
                            <span className="me-3"><i className="fa-solid fa-user me-1"></i> Asked by {q.asker_name}</span>
                            {q.is_expert_answered && (
                              <span className="text-success"><i className="fa-solid fa-circle-check me-1"></i> Expert Answered</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-5 bg-white rounded shadow-sm border border-light">
                  <i className="fa-regular fa-comment-dots fa-3x text-muted mb-3"></i>
                  <h4 className="h5">No questions yet for {location}</h4>
                  <p className="text-muted">Be the first to ask a question about {category} in your area.</p>
                  <Link href="/contact" className="btn btn-info mt-2 text-white">Ask Now</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ RELATED SERVICES ══ */}
      {relatedPages.filter((rp: any) => rp.slug !== params.slug).length > 0 && (
        <section className="section-pad bg-white">
          <div className="container">
            <div className="row mb-4">
              <div className="col-12 text-center">
                <h2 className="h3 fw-bold">Other Services in {location}</h2>
                <p className="text-muted">Explore more top-rated home care solutions available in your area.</p>
              </div>
            </div>
            <div className="row g-4 justify-content-center">
              {relatedPages.filter((rp: any) => rp.slug !== params.slug).slice(0, 3).map((rp: any, i: number) => (
                <div key={i} className="col-md-6 col-lg-4">
                  <div className="card h-100 shadow-sm border-0" style={{ border: '1px solid #eee' }}>
                    <div className="card-body p-4">
                      <h3 className="h6 card-title">
                        <Link href={`/service/${rp.slug}`} className="text-dark text-decoration-none fw-bold">
                          {rp.page_title}
                        </Link>
                      </h3>
                    </div>
                    <div className="card-footer bg-white border-0 p-4 pt-0">
                      <Link href={`/service/${rp.slug}`} className="btn btn-outline-info btn-sm w-100">Learn More</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ ENQUIRY FORM ══ */}
      <section className="section-pad bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center mb-5">
              <h2 className="section-title">Ready to Book?</h2>
              <p className="section-sub mx-auto">Fill the form below and our care coordinator will reach out to you within an hour.</p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-7 bg-white p-5 rounded-4 shadow-sm">
              <HomeEnquiryForm />
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }} />
    </main>
  );
}
