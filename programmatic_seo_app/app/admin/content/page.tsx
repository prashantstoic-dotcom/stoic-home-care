import { fetchSupabase } from "@/lib/supabase";

export const metadata = { title: "SEO Content Hub | Stoic Admin" };

export default async function ContentHubPage() {
  // Fetch SEO pages (limit to avoid massive payloads, or add basic pagination later)
  const seoPagesPromise = fetchSupabase("stoic_home_care?select=id,slug,page_title,category,location&limit=100");
  
  // Fetch Blogs
  const blogsPromise = fetchSupabase("stoic_blogs?select=id,slug,title,published_at,author&order=published_at.desc&limit=50");

  const [seoPages, blogs] = await Promise.all([seoPagesPromise, blogsPromise]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0" style={{ color: '#1a3a6b' }}>SEO Content Hub</h3>
      </div>

      <ul className="nav nav-pills mb-4" id="contentTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active fw-semibold" id="pages-tab" data-bs-toggle="pill" data-bs-target="#pages" type="button" role="tab" aria-controls="pages" aria-selected="true">
            <i className="fa-solid fa-file-lines me-2"></i> SEO Landing Pages
            <span className="badge bg-white text-primary ms-2 rounded-pill">
              {seoPages?.length || 0}
            </span>
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link fw-semibold ms-2" id="blogs-tab" data-bs-toggle="pill" data-bs-target="#blogs" type="button" role="tab" aria-controls="blogs" aria-selected="false">
            <i className="fa-solid fa-newspaper me-2"></i> Blog Posts
            <span className="badge bg-white text-primary ms-2 rounded-pill">
              {blogs?.length || 0}
            </span>
          </button>
        </li>
      </ul>

      <div className="tab-content" id="contentTabContent">
        {/* SEO Pages Tab */}
        <div className="tab-pane fade show active" id="pages" role="tabpanel" aria-labelledby="pages-tab" tabIndex={0}>
          <div className="card shadow-sm border-0" style={{ borderRadius: '15px' }}>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4">Page Title</th>
                      <th>Location</th>
                      <th>Category</th>
                      <th className="text-end pe-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(!seoPages || seoPages.length === 0) ? (
                      <tr><td colSpan={4} className="text-center py-4 text-muted">No SEO pages found.</td></tr>
                    ) : (
                      seoPages.map((page: any) => (
                        <tr key={page.id}>
                          <td className="ps-4">
                            <div className="fw-medium text-dark">{page.page_title}</div>
                            <small className="text-muted">/{page.slug}</small>
                          </td>
                          <td><span className="badge bg-light text-dark border">{page.location}</span></td>
                          <td><span className="badge bg-secondary">{page.category}</span></td>
                          <td className="text-end pe-4">
                            <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
                              <i className="fa-solid fa-external-link-alt me-1"></i> View
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        {/* Blogs Tab */}
        <div className="tab-pane fade" id="blogs" role="tabpanel" aria-labelledby="blogs-tab" tabIndex={0}>
          <div className="card shadow-sm border-0" style={{ borderRadius: '15px' }}>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4">Blog Title</th>
                      <th>Author</th>
                      <th>Published</th>
                      <th className="text-end pe-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(!blogs || blogs.length === 0) ? (
                      <tr><td colSpan={4} className="text-center py-4 text-muted">No blog posts found.</td></tr>
                    ) : (
                      blogs.map((blog: any) => (
                        <tr key={blog.id}>
                          <td className="ps-4">
                            <div className="fw-medium text-dark">{blog.title}</div>
                            <small className="text-muted">/blog/{blog.slug}</small>
                          </td>
                          <td><span className="badge bg-light text-dark border"><i className="fa-solid fa-user me-1"></i>{blog.author}</span></td>
                          <td>{new Date(blog.published_at).toLocaleDateString()}</td>
                          <td className="text-end pe-4">
                            <a href={`/blog/${blog.slug}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
                              <i className="fa-solid fa-external-link-alt me-1"></i> View
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
