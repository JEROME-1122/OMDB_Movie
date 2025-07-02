export function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center my-5 flex-wrap gap-2">
      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 border rounded ${
            currentPage === page ? "bg-blue-500 text-white" : "bg-white"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
