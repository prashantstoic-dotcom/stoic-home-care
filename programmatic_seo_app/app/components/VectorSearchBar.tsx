"use client";

import { useState } from 'react';
import Link from 'next/link';

type SearchResult = {
  page_id: string;
  seo_title: string;
  slug: string;
  category: string;
  similarity: number;
};

export default function VectorSearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    setResults([]);

    try {
      const response = await fetch('/api/vector-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      
      if (data.success && data.matches) {
        setResults(data.matches);
      } else {
        console.error("Search failed:", data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-search-container">
      <form onSubmit={handleSearch} className="ai-search-form">
        <div className="search-input-wrapper">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            className="ai-search-input"
            placeholder="Ask anything (e.g. 'why is my ac leaking water?')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="ai-search-button" disabled={isLoading || !query.trim()}>
            {isLoading ? 'Thinking...' : 'AI Search'}
          </button>
        </div>
      </form>

      {hasSearched && (
        <div className="ai-search-results">
          {isLoading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Gemini is converting your intent into math...</p>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <ul className="results-list">
              {results.map((res, index) => {
                // Convert similarity to percentage (e.g. 0.854 -> 85%)
                const matchPercentage = Math.round(res.similarity * 100);
                
                return (
                  <li key={index} className="result-item">
                    <Link href={`/${res.category ? res.category + '/' : ''}${res.slug}`} className="result-link">
                      <div className="result-content">
                        <span className="result-category">{res.category || 'Article'}</span>
                        <h4 className="result-title">{res.seo_title}</h4>
                        <p className="result-slug">/{res.slug}</p>
                      </div>
                      <div className="result-score">
                        <div className="score-circle">
                          {matchPercentage}%
                        </div>
                        <span>Match</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {!isLoading && results.length === 0 && (
            <div className="no-results">
              <p>No highly relevant articles found. Try rephrasing your intent.</p>
            </div>
          )}
        </div>
      )}

      {/* Vanilla CSS for Premium UI (Zero Tailwind dependency) */}
      <style>{`
        .ai-search-container {
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .ai-search-form {
          position: relative;
          z-index: 10;
        }

        .search-input-wrapper {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 9999px;
          padding: 8px 8px 8px 24px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
          transition: all 0.3s ease;
        }
        
        .search-input-wrapper:focus-within {
          box-shadow: 0 20px 25px -5px rgba(37, 99, 235, 0.15), 0 8px 10px -6px rgba(37, 99, 235, 0.1);
          border-color: rgba(37, 99, 235, 0.3);
          transform: translateY(-2px);
        }

        .search-icon {
          width: 20px;
          height: 20px;
          color: #9ca3af;
          margin-right: 12px;
        }

        .ai-search-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 1.1rem;
          color: #1f2937;
          outline: none;
          padding: 8px 0;
        }

        .ai-search-input::placeholder {
          color: #9ca3af;
        }

        .ai-search-button {
          background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
          color: white;
          border: none;
          border-radius: 9999px;
          padding: 12px 24px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
        }

        .ai-search-button:hover:not(:disabled) {
          opacity: 0.9;
          transform: scale(1.02);
        }

        .ai-search-button:disabled {
          background: #d1d5db;
          cursor: not-allowed;
        }

        .ai-search-results {
          margin-top: 16px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.1);
          border: 1px solid rgba(0,0,0,0.05);
          overflow: hidden;
          animation: slideDown 0.3s ease-out forwards;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .loading-state {
          padding: 40px;
          text-align: center;
          color: #6b7280;
          font-weight: 500;
        }

        .spinner {
          width: 30px;
          height: 30px;
          border: 3px solid rgba(37, 99, 235, 0.1);
          border-radius: 50%;
          border-top-color: #2563eb;
          animation: spin 1s ease-in-out infinite;
          margin: 0 auto 16px auto;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .results-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .result-item {
          border-bottom: 1px solid #f3f4f6;
        }
        
        .result-item:last-child {
          border-bottom: none;
        }

        .result-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          text-decoration: none;
          color: inherit;
          transition: background-color 0.2s;
        }

        .result-link:hover {
          background-color: #f8fafc;
        }

        .result-category {
          font-size: 0.75rem;
          text-transform: uppercase;
          font-weight: 700;
          color: #4f46e5;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
          display: block;
        }

        .result-title {
          margin: 0 0 4px 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #111827;
        }

        .result-slug {
          margin: 0;
          font-size: 0.85rem;
          color: #6b7280;
          font-family: ui-monospace, monospace;
        }

        .result-score {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .score-circle {
          background: #ecfdf5;
          color: #059669;
          font-weight: 800;
          font-size: 1rem;
          padding: 8px 12px;
          border-radius: 9999px;
          margin-bottom: 4px;
        }

        .result-score span {
          font-size: 0.7rem;
          text-transform: uppercase;
          color: #9ca3af;
          font-weight: 600;
        }

        .no-results {
          padding: 30px;
          text-align: center;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}
