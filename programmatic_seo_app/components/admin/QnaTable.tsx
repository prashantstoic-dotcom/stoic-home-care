"use client";

import { useState } from "react";
import { answerQna } from "@/lib/admin-actions";

type QnA = {
  id: number;
  question: string;
  answer?: string;
  author: string;
  category: string;
  location: string;
  status: string;
  created_at: string;
};

export default function QnaTable({ initialQna }: { initialQna: QnA[] }) {
  const [qnas, setQnas] = useState<QnA[]>(initialQna);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [answeringId, setAnsweringId] = useState<number | null>(null);
  const [answerText, setAnswerText] = useState("");

  const handlePublish = async (id: number) => {
    if (!answerText.trim()) {
      alert("Answer cannot be empty");
      return;
    }
    
    setLoadingId(id);
    
    const res = await answerQna(id, answerText);
    
    if (res.success) {
      setQnas(qnas.map(q => q.id === id ? { ...q, status: "published", answer: answerText } : q));
      setAnsweringId(null);
      setAnswerText("");
    } else {
      alert("Failed to publish answer. Please try again.");
    }
    
    setLoadingId(null);
  };

  if (!qnas || qnas.length === 0) {
    return (
      <div className="text-center py-5 bg-white border rounded">
        <i className="fa-solid fa-comments fa-3x text-muted mb-3"></i>
        <p className="text-muted mb-0">No Q&A found.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive bg-white border rounded shadow-sm">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th className="ps-4">Question Details</th>
            <th>Category / Location</th>
            <th>Status</th>
            <th className="text-end pe-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {qnas.map((q) => (
            <tr key={q.id}>
              <td className="ps-4 py-3" style={{ maxWidth: '400px' }}>
                <div className="fw-bold text-dark mb-1">{q.question}</div>
                <div className="text-muted small">Asked by <strong>{q.author}</strong> on {new Date(q.created_at).toLocaleDateString()}</div>
                
                {q.status === 'published' && (
                  <div className="mt-2 p-2 bg-light rounded small border-start border-3 border-primary">
                    <strong className="text-primary">Answer:</strong> {q.answer}
                  </div>
                )}

                {answeringId === q.id && q.status === 'pending' && (
                  <div className="mt-3 p-3 bg-light rounded border">
                    <label className="form-label small fw-bold">Provide Answer:</label>
                    <textarea 
                      className="form-control mb-2" 
                      rows={3} 
                      placeholder="Write your answer here..."
                      value={answerText}
                      onChange={(e) => setAnswerText(e.target.value)}
                    ></textarea>
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => handlePublish(q.id)}
                        disabled={loadingId === q.id}
                      >
                        {loadingId === q.id ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Publish Answer'}
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setAnsweringId(null)}
                        disabled={loadingId === q.id}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </td>
              <td>
                <span className="badge bg-secondary mb-1 d-block w-fit-content">{q.category}</span>
                <span className="badge bg-light text-dark border">{q.location}</span>
              </td>
              <td>
                <span className={`badge ${q.status === 'pending' ? 'bg-warning text-dark' : 'bg-success'}`}>
                  {q.status.toUpperCase()}
                </span>
              </td>
              <td className="text-end pe-4">
                {q.status === 'pending' && answeringId !== q.id && (
                  <button 
                    onClick={() => setAnsweringId(q.id)}
                    className="btn btn-sm btn-primary"
                  >
                    <i className="fa-solid fa-reply me-1"></i> Answer
                  </button>
                )}
                {q.status === 'published' && (
                  <span className="text-success small fw-semibold">
                    <i className="fa-solid fa-check-circle me-1"></i>Live
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
