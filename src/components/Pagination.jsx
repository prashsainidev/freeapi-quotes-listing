import React from 'react';

const Pagination = ({ meta, page, setPage }) => {
  if (!meta) return null;
  
  const { totalPages } = meta;
  
  let startPage = Math.max(1, page - 2);
  let endPage = Math.min(totalPages, page + 2);
  
  if (page <= 2) endPage = Math.min(5, totalPages);
  if (page >= totalPages - 1) startPage = Math.max(1, totalPages - 4);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button 
        className="page-btn nav-btn" 
        disabled={page === 1} 
        onClick={() => setPage(1)}
        title="Go to First Page"
      >
        &laquo; First
      </button>

      <button 
        className="page-btn nav-btn" 
        disabled={page === 1} 
        onClick={() => setPage(page - 1)}
        title="Previous Page"
      >
        &lsaquo; Prev
      </button>
      
      {startPage > 1 && <span className="page-dots">...</span>}
      
      {pages.map(p => (
        <button 
          key={p} 
          className={`page-btn ${p === page ? 'active' : ''}`}
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      ))}
      
      {endPage < totalPages && <span className="page-dots">...</span>}
      
      <button 
        className="page-btn nav-btn" 
        disabled={page === totalPages} 
        onClick={() => setPage(page + 1)}
        title="Next Page"
      >
        Next &rsaquo;
      </button>

      <button 
        className="page-btn nav-btn" 
        disabled={page === totalPages} 
        onClick={() => setPage(totalPages)}
        title="Go to Last Page"
      >
        Last &raquo;
      </button>
    </div>
  );
};

export default Pagination;
