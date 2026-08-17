import { getBlogPosts } from '@/lib/supabase';
import Link from 'next/link';

export const metadata = {
  title: "Knowledge Base & Health Tips | Stoic Home Care",
  description: "Read expert articles on home healthcare, medical equipment guides, and caregiving tips from Stoic Home Care professionals."
};

export default async function BlogHubPage() {
  const blogs = await getBlogPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Knowledge Base & Health Tips | Stoic Home Care",
    "description": "Read expert articles on home healthcare, medical equipment guides, and caregiving tips from Stoic Home Care professionals.",
    "url": "https://stoiccare.in/blog",
    "hasPart": (blogs || []).map((blog: any) => ({
      "@type": "BlogPosting",
      "headline": blog.title,
      "url": `https://stoiccare.in/blog/${blog.slug}`,
      "datePublished": blog.published_at || new Date().toISOString(),
      "description": blog.excerpt,
      "author": {
        "@type": "Person",
        "name": blog.author || "Stoic Experts"
      }
    }))
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="contact-hero-section" aria-label="Blog Hero">
        <div className="container position-relative" style={{ zIndex: 2, paddingBottom: '25px' }}>
          <div className="row align-items-center g-5 py-5 text-center">
            <div className="col-12" data-aos="fade-up">
              <h1 className="hero-title text-white" style={{ fontSize: '3.5rem', fontWeight: 800 }}>Knowledge Base & Insights</h1>
              <p className="hero-sub text-white-50 mt-3" style={{ fontSize: '1.2rem' }}>Expert advice, health tips, and guides for better home healthcare.</p>
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
              <li className="breadcrumb-item active" aria-current="page">Blog</li>
            </ol>
          </nav>

          {blogs.length === 0 ? (
            <div className="alert alert-info text-center py-5 shadow-sm border-0" style={{ borderRadius: '12px', backgroundColor: '#e0f7fa', color: '#006064' }}>
              <i className="fa-solid fa-pen-nib fs-2 mb-3" style={{ color: '#0CB8C9' }}></i>
              <h4 className="fw-bold">Our knowledge base is currently being updated.</h4>
              <p className="mb-0">Check back soon for expert articles and health tips.</p>
            </div>
          ) : (
            <div className="row g-4">
              {blogs.map((blog: any, index: number) => {
                const date = new Date(blog.published_at || Date.now());
                const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

                return (
                  <div key={index} className="col-md-6 col-lg-4">
                    <div className="card h-100 shadow-sm border-0 hover-lift" style={{ transition: 'transform 0.2s ease, box-shadow 0.2s ease', borderRadius: '12px' }}>
                      <div className="card-body p-4">
                        <div className="text-muted small mb-3">
                          <i className="fa-regular fa-calendar me-2"></i> {formattedDate}
                        </div>
                        <h3 className="h5 card-title fw-bold">
                          <Link href={`/blog/${blog.slug}`} className="text-dark text-decoration-none hover-primary">
                            {blog.title}
                          </Link>
                        </h3>
                        <p className="text-muted small mt-3" style={{ lineHeight: 1.6 }}>{blog.excerpt}</p>
                      </div>
                      <div className="card-footer bg-white border-0 p-4 pt-0 d-flex justify-content-between align-items-center">
                        <span className="small fw-semibold" style={{ color: '#0CB8C9' }}>By {blog.author || 'Stoic Experts'}</span>
                        <Link href={`/blog/${blog.slug}`} className="btn btn-outline-info btn-sm px-3" style={{ borderRadius: '6px' }}>
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
