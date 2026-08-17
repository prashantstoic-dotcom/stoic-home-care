import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found – Stoic Home Care',
  description: 'The page you are looking for does not exist or has been moved.',
};

export default function NotFound() {
  return (
    <main id="main-content" style={{ padding: '100px 0', textAlign: 'center', background: '#f8fbff', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '6rem', fontWeight: 900, color: '#0CB8C9', marginBottom: 0 }}>404</h1>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f2240', marginBottom: '1.5rem' }}>Oops! Page Not Found</h2>
          <p style={{ fontSize: '1.1rem', color: '#6b82a3', marginBottom: '2rem' }}>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn btn-lg" style={{ background: 'linear-gradient(135deg, #0CB8C9, #1D9E75)', color: '#fff', borderRadius: '50px', padding: '0.8rem 2rem', fontWeight: 600, textDecoration: 'none', boxShadow: '0 8px 25px rgba(12,184,201,0.3)' }}>
              <i className="fa-solid fa-house me-2"></i> Back to Home
            </Link>
            <Link href="/contact" className="btn btn-lg" style={{ background: '#fff', color: '#0f2240', borderRadius: '50px', padding: '0.8rem 2rem', fontWeight: 600, border: '1px solid #e0e6ed', textDecoration: 'none', boxShadow: '0 8px 25px rgba(0,0,0,0.05)' }}>
              <i className="fa-solid fa-envelope me-2"></i> Contact Us
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
