import { fetchSupabase } from "@/lib/supabase";
import QnaTable from "@/components/admin/QnaTable";

export const metadata = { title: "Q&A Moderation | Stoic Admin" };

export default async function QnaPage() {
  // Fetch pending QnA
  const pendingQna = await fetchSupabase("stoic_qna?status=eq.pending&order=created_at.desc");
  
  // Fetch published QnA (limit to last 50 for performance)
  const publishedQna = await fetchSupabase("stoic_qna?status=eq.published&order=created_at.desc&limit=50");

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0" style={{ color: '#1a3a6b' }}>Q&A Moderation</h3>
      </div>

      <ul className="nav nav-pills mb-4" id="qnaTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active fw-semibold" id="pending-tab" data-bs-toggle="pill" data-bs-target="#pending" type="button" role="tab" aria-controls="pending" aria-selected="true">
            <i className="fa-solid fa-hourglass-half me-2"></i> Pending Questions
            <span className="badge bg-white text-primary ms-2 rounded-pill">
              {pendingQna?.length || 0}
            </span>
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link fw-semibold ms-2" id="published-tab" data-bs-toggle="pill" data-bs-target="#published" type="button" role="tab" aria-controls="published" aria-selected="false">
            <i className="fa-solid fa-check-double me-2"></i> Published Q&A
          </button>
        </li>
      </ul>

      <div className="tab-content" id="qnaTabContent">
        <div className="tab-pane fade show active" id="pending" role="tabpanel" aria-labelledby="pending-tab" tabIndex={0}>
          <QnaTable initialQna={pendingQna || []} />
        </div>
        
        <div className="tab-pane fade" id="published" role="tabpanel" aria-labelledby="published-tab" tabIndex={0}>
          <QnaTable initialQna={publishedQna || []} />
        </div>
      </div>
    </>
  );
}
