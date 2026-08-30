import Link from "next/link";
import { logoutAdmin } from "@/lib/auth-actions";
import { ReactNode } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";


export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-layout d-flex">
      {/* Sidebar */}
      <aside className="admin-sidebar text-white shadow-sm">
        <div className="p-4 border-bottom border-light border-opacity-10">
          <h4 className="fw-bold mb-0 text-white">Stoic Admin</h4>
        </div>
        <nav className="p-3">
          <ul className="nav flex-column gap-2">
            <li className="nav-item">
              <Link href="/admin" className="nav-link text-white-50">
                <i className="fa-solid fa-gauge me-2"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/leads" className="nav-link text-white-50">
                <i className="fa-solid fa-calendar-check me-2"></i> Leads
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/enquiries" className="nav-link text-white-50">
                <i className="fa-solid fa-headset me-2"></i> Enquiries
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/seo-roi" className="nav-link text-white-50">
                <i className="fa-solid fa-chart-line me-2"></i> SEO ROI
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/qna" className="nav-link text-white-50">
                <i className="fa-solid fa-question-circle me-2"></i> Q&A Moderation
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/content" className="nav-link text-white-50">
                <i className="fa-solid fa-file-lines me-2"></i> Content Hub
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/services" className="nav-link text-white-50">
                <i className="fa-solid fa-hand-holding-medical me-2"></i> Services
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/equipment" className="nav-link text-white-50">
                <i className="fa-solid fa-wheelchair me-2"></i> Equipment
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-3 mt-auto border-top border-light border-opacity-10">
          <form action={logoutAdmin}>
            <button className="btn btn-outline-light w-100 text-start">
              <i className="fa-solid fa-sign-out-alt me-2"></i> Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main flex-grow-1 bg-light">
        {/* Top Navbar */}
        <header className="admin-topbar bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 text-dark fw-bold">Admin Panel</h5>
          <div className="dropdown">
            <button className="btn btn-light rounded-circle" type="button" style={{width: '40px', height: '40px'}}>
              <i className="fa-solid fa-user"></i>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4">
          {children}
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .admin-layout {
          min-height: 100vh;
          font-family: 'Segoe UI', sans-serif;
        }
        .admin-sidebar {
          width: 260px;
          background: #1a3a6b;
          display: flex;
          flex-direction: column;
        }
        .admin-main {
          min-height: 100vh;
        }
        .nav-link {
          border-radius: 8px;
          transition: all 0.2s;
        }
        .nav-link:hover {
          background: rgba(255,255,255,0.1);
          color: white !important;
        }
      `}} />
    </div>
  );
}
