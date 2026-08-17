import { getAuthorBySlug } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const author = await getAuthorBySlug(params.slug);
  if (!author) return { title: 'Author Not Found' };

  return {
    title: `${author.name} | Expert Profiles | Stoic Home Care`,
    description: author.bio || `Learn more about ${author.name}, a certified medical expert at Stoic Home Care.`,
  };
}

export default async function AuthorProfilePage({ params }: { params: { slug: string } }) {
  const author = await getAuthorBySlug(params.slug);
  if (!author) {
    notFound();
  }

  // Schema for ProfilePage & Person (E-E-A-T)
  const customSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": author.name,
      "jobTitle": author.qualifications || 'Healthcare Expert',
      "worksFor": {
        "@type": "Organization",
        "name": "Stoic Home Care"
      },
      "description": author.bio || ''
    }
  };

  const initial = author.name ? author.name.charAt(0).toUpperCase() : 'S';

  return (
    <main id="main-content">
      <header className="contact-hero-section" aria-label="Author Profile Hero">
        <div className="container position-relative" style={{ zIndex: 2, paddingBottom: '25px' }}>
          <div className="row align-items-center g-5 py-5 justify-content-center">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              <div 
                className="d-inline-flex align-items-center justify-content-center bg-white rounded-circle mb-3 shadow" 
                style={{ width: '100px', height: '100px', fontSize: '2.5rem', fontWeight: 'bold', color: '#0CB8C9' }}
              >
                {initial}
              </div>
              <h1 className="hero-title text-white mb-2" style={{ fontSize: '3rem', fontWeight: 800 }}>{author.name}</h1>
              <p className="hero-sub text-white-50" style={{ fontSize: '1.2rem' }}>
                <i className="fa-solid fa-user-md me-2"></i>{author.qualifications || 'Certified Medical Expert'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="section-pad bg-light">
        <div className="container">
          {/* Visual Breadcrumbs */}
          <nav aria-label="breadcrumb" className="mb-5">
            <ol className="breadcrumb justify-content-center">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item"><Link href="/blog">Blog</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{author.name}</li>
            </ol>
          </nav>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="bg-white p-4 p-md-5 rounded shadow-sm text-center border border-secondary border-opacity-10" data-aos="fade-up">
                <h2 className="h3 fw-bold mb-4" style={{ color: '#2c3e50' }}>About {author.name}</h2>
                <p className="lead text-muted mb-0" style={{ lineHeight: 1.8 }}>
                  {author.bio || 'This author has not provided a bio yet.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }} />
    </main>
  );
}
