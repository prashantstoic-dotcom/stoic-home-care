import { getBlogPost, getLinkDictionary } from '@/lib/supabase';
import { AutoLinker } from '@/lib/autolinker';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = await getBlogPost(params.slug);
  if (!blog) return { title: 'Blog Not Found' };

  const publishedDate = new Date(blog.published_at || Date.now()).toISOString();

  return {
    title: `${blog.title} | Stoic Home Care`,
    description: blog.excerpt || '',
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: {
      title: `${blog.title} | Stoic Home Care`,
      description: blog.excerpt || '',
      type: "article",
      publishedTime: publishedDate,
      authors: [blog.author || "Stoic Experts"],
      images: [
        {
          url: blog.image_url || "/images/carousel-1.avif",
          width: 1200,
          height: 630,
          alt: blog.title,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} | Stoic Home Care`,
      description: blog.excerpt || '',
      images: [blog.image_url || "/images/carousel-1.avif"],
    }
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = await getBlogPost(params.slug);
  if (!blog) {
    notFound();
  }

  // Schema processing
  const publishedDate = new Date(blog.published_at || Date.now());
  const customSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": blog.excerpt,
    "author": {
      "@type": "Person",
      "name": blog.author || "Stoic Experts"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Stoic Home Care",
      "logo": {
        "@type": "ImageObject",
        "url": "https://stoiccare.in/assets/images/logo.png"
      }
    },
    "datePublished": publishedDate.toISOString()
  };

  // Content processing
  let rawContent = blog.content || '<p>Content is being updated.</p>';
  rawContent = AutoLinker.optimizeImages(rawContent, blog.title);
  const dictionary = await getLinkDictionary();
  let linkedHtml = AutoLinker.linkify(rawContent, dictionary);

  const formattedDate = publishedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <main id="main-content">
      <style dangerouslySetInnerHTML={{__html: `
        .blog-content-block { font-size: 1.1rem; line-height: 1.8; color: #444; }
        .blog-content-block h2 { color: #2c3e50; margin-top: 2rem; margin-bottom: 1rem; font-weight: 700; }
        .blog-content-block h3 { color: #2c3e50; margin-top: 1.5rem; margin-bottom: 1rem; font-weight: 600; }
        .blog-content-block ul, .blog-content-block ol { padding-left: 20px; margin-bottom: 1.5rem; }
        .blog-content-block li { margin-bottom: 0.5rem; }
      `}} />

      <header className="contact-hero-section" aria-label="Blog Post Hero">
        <div className="container position-relative" style={{ zIndex: 2, paddingBottom: '25px' }}>
          <div className="row align-items-center g-5 py-5 text-center justify-content-center">
            <div className="col-lg-8" data-aos="fade-up">
              <h1 className="hero-title text-white" style={{ fontSize: '3rem', fontWeight: 800 }}>{blog.title}</h1>
              <p className="text-white-50 mt-3 mb-0" style={{ fontSize: '1.1rem' }}>
                  <i className="fa-regular fa-calendar me-1"></i> {formattedDate} 
                  <span className="mx-3">|</span> 
                  <i className="fa-solid fa-user-doctor me-1"></i> By {blog.author || 'Stoic Experts'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="section-pad bg-light">
        <div className="container">
          
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link href="/">Home</Link></li>
              <li className="breadcrumb-item"><Link href="/blog">Blog</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{blog.title}</li>
            </ol>
          </nav>

          <div className="row justify-content-center">
            <div className="col-lg-9">
              <article className="blog-content-block bg-white p-4 p-md-5 rounded shadow-sm border border-secondary border-opacity-10" data-aos="fade-up">
                <div dangerouslySetInnerHTML={{ __html: linkedHtml }} />
              </article>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }} />
    </main>
  );
}
