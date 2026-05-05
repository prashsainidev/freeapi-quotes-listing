import { useState, useEffect } from 'react';
import Pagination from './components/Pagination';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchQuotes = async (currentPage) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://api.freeapi.app/api/v1/public/quotes?page=${currentPage}&limit=10`);
      const data = await response.json();
      
      // Artificial delay for smooth loading animation
      await new Promise(resolve => setTimeout(resolve, 600));
      
      setQuotes(data.data.data);
      setMeta(data.data);
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError('Sorry! Something went wrong while fetching the Quotes!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes(page);
  }, [page]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `Added: ${date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })}`;
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Quote Collection</h1>
        {meta && <p className="subtitle">{meta.totalItems} timeless quotes</p>}
      </header>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Gathering wisdom…</p>
        </div>
      )}
      
      {error && (
        <div className="error-card">
          <p>😔 {error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {meta && (
            <div className="stats-bar">
              <div className="stat-card">
                <span className="stat-label">Total Quotes</span>
                <span className="stat-value">{meta.totalItems}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">This Page</span>
                <span className="stat-value">{meta.currentPageItems}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Total Pages</span>
                <span className="stat-value">{meta.totalPages}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Current Page</span>
                <span className="stat-value">{meta.page}</span>
              </div>
            </div>
          )}

          {/* Top Pagination */}
          {quotes.length > 0 && (
            <Pagination meta={meta} page={page} setPage={setPage} />
          )}

          <div className="quotes-list">
            {quotes.map((quote, index) => (
              <div 
                key={quote.id} 
                className="quote-card"
                style={{ animationDelay: `${index * 0.07}s` }}
              >
                <div className="quote-header">
                  <span className="quote-id">#{String(quote.id).padStart(3, '0')}</span>
                  {quote.dateAdded && (
                    <span className="quote-date">{formatDate(quote.dateAdded)}</span>
                  )}
                </div>
                
                <div className="quote-body">
                  <p className="quote-content">{quote.content}</p>
                </div>
                
                <div className="quote-author-section">
                  <span className="quote-author">— {quote.author}</span>
                </div>

                <div className="quote-footer">
                  <div className="quote-tags">
                    {quote.tags && quote.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag-pill">{tag}</span>
                    ))}
                  </div>
                  
                  <span className="char-count-badge">{quote.length || quote.content.length} chars</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Pagination */}
          {quotes.length > 0 && (
            <Pagination meta={meta} page={page} setPage={setPage} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
