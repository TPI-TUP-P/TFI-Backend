const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex items-center justify-center gap-2 overflow-x-auto px-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="shrink-0 rounded-lg border border-brand-border bg-brand-card px-3 py-2 text-sm font-medium text-brand-title transition hover:bg-brand-bg disabled:cursor-not-allowed disabled:opacity-40"
      >
        ←
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-9 min-w-9 shrink-0 rounded-lg px-3 text-sm font-semibold transition ${
              currentPage === page
                ? "bg-brand-accent text-white"
                : "border border-brand-border bg-brand-card text-brand-title hover:bg-brand-bg"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="shrink-0 rounded-lg border border-brand-border bg-brand-card px-3 py-2 text-sm font-medium text-brand-title transition hover:bg-brand-bg disabled:cursor-not-allowed disabled:opacity-40"
      >
        →
      </button>
    </div>
  );
};

export default Pagination;