import VectorSearchBar from '../components/VectorSearchBar';

export default function SearchDemoPage() {
  return (
    <div className="demo-page">
      <div className="demo-background"></div>
      
      <main className="demo-content">
        <div className="demo-header">
          <span className="badge">Project 7 : Final Phase</span>
          <h1>AI Semantic Search <span>Experience</span></h1>
          <p>
            Forget keyword matching. Ask a complex question, and our AI will translate your intent 
            into a 768-dimension mathematical vector to find the exact article you need in 0ms.
          </p>
        </div>

        <VectorSearchBar />

      </main>

      <style>{`
        .demo-page {
          min-height: 100vh;
          background-color: #f8fafc;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          padding: 20px;
          overflow: hidden;
        }

        .demo-background {
          position: absolute;
          top: -20%;
          left: -10%;
          width: 120%;
          height: 120%;
          background: radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.08) 0%, rgba(255,255,255,0) 70%);
          z-index: 1;
        }

        .demo-content {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 900px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .demo-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .badge {
          display: inline-block;
          background: #e0e7ff;
          color: #4338ca;
          padding: 6px 16px;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .demo-header h1 {
          font-size: 3.5rem;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -0.03em;
          margin: 0 0 16px 0;
          line-height: 1.1;
        }

        .demo-header h1 span {
          background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .demo-header p {
          font-size: 1.15rem;
          color: #475569;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}
