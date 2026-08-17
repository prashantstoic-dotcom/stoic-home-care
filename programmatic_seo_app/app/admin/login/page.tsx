"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/lib/auth-actions";

export default function AdminLogin() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    
    // Call server action directly from client component
    const res = await loginAdmin(null, formData);
    
    if (res.success && res.redirect) {
      router.push(res.redirect);
      router.refresh();
    } else {
      setErrorMsg(res.message || "Login failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-logo">
          <i className="fa-solid fa-user-shield fa-2x mb-2" style={{ color: "#1a3a6b" }}></i>
          <h2>Stoic Home Care</h2>
          <small>Admin Panel Login</small>
        </div>

        {errorMsg && (
          <div className="alert-error">
            <i className="fa-solid fa-circle-exclamation me-2"></i>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <div className="input-group">
              <span className="input-group-text"><i className="fa-solid fa-user"></i></span>
              <input type="text" name="username" className="form-control" placeholder="Enter username" required autoComplete="username" />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                className="form-control" 
                placeholder="Enter password" 
                required 
                autoComplete="current-password" 
              />
              <button 
                type="button" 
                className="btn btn-outline-secondary" 
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>
          
          <button type="submit" className="btn-login" disabled={isLoading}>
            {isLoading ? (
              <><i className="fa-solid fa-spinner fa-spin me-2"></i>Logging in…</>
            ) : (
              <><i className="fa-solid fa-right-to-bracket me-2"></i>Login to Dashboard</>
            )}
          </button>
        </form>

        <p className="text-center mt-4 pt-3 border-top mb-0">
          <a href="/" className="back-link">
            <i className="fa-solid fa-arrow-left me-1"></i>Back to Website
          </a>
        </p>
      </div>

      <style jsx>{`
        .login-wrapper { 
          background: linear-gradient(135deg, #1a3a6b 0%, #2196d3 60%, #4ecdc4 100%); 
          min-height: 100vh; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          padding: 1rem;
        }
        .login-card { 
          background: #fff; 
          border-radius: 20px; 
          padding: 2.5rem 2rem; 
          width: 100%; 
          max-width: 420px; 
          box-shadow: 0 24px 80px rgba(0,0,0,.3); 
        }
        .login-logo { text-align: center; margin-bottom: 1.5rem; }
        .login-logo h2 { color: #1a3a6b; font-weight: 800; font-size: 1.6rem; margin: 0.5rem 0 0; }
        .login-logo small { color: #6b82a3; font-size: .85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .btn-login { 
          background: linear-gradient(135deg, #1a3a6b, #2196d3); 
          color: #fff; 
          border: none; 
          padding: .85rem; 
          border-radius: 12px; 
          font-weight: 700; 
          font-size: 1rem; 
          width: 100%; 
          cursor: pointer; 
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-login:hover:not(:disabled) { 
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(33, 150, 211, 0.4);
        }
        .btn-login:disabled { opacity: 0.7; cursor: not-allowed; }
        .alert-error { 
          background: #fdecea; 
          color: #d32f2f; 
          border: 1px solid #f8bbd0;
          border-radius: 10px; 
          padding: .75rem 1rem; 
          font-size: .88rem; 
          margin-bottom: 1.25rem; 
          font-weight: 500;
        }
        .back-link {
          color: #6b82a3;
          font-size: .85rem;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }
        .back-link:hover {
          color: #1a3a6b;
        }
        .input-group-text {
          background-color: #f8fafc;
          border-right: none;
          color: #94a3b8;
        }
        .form-control {
          border-left: none;
        }
        .form-control:focus {
          border-color: #dee2e6;
          box-shadow: none;
        }
        .input-group:focus-within {
          box-shadow: 0 0 0 0.25rem rgba(33, 150, 211, 0.25);
          border-radius: 0.375rem;
        }
        .input-group:focus-within .input-group-text,
        .input-group:focus-within .form-control,
        .input-group:focus-within .btn {
          border-color: #86b7fe;
        }
      `}</style>
    </div>
  );
}
