import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { fetchMovies } from "../services/api";
import { MovieCard } from "../component";
import { Pagination } from "../component/Pagination";

export function SearchResults() {
  const [movies, setMovies] = useState([]);
  const [type, setType] = useState("");
  const [error, setError] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query");

  useEffect(() => {
    async function loadData() {
      if (query) {
        const data = await fetchMovies(query, currentPage, type);
        if (data.error) {
          setError(data.error);
          setMovies([]);
          setTotalResults(0);
        } else {
          setMovies(data.Search || []);
          setTotalResults(parseInt(data.totalResults));
          setError("");
        }
      }
    }
    loadData();
  }, [query, currentPage, type]);

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="container mx-auto md:pt-[120px] pt-[150px] px-4">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Results for: "{query}"</h2>
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-1 rounded"
        >
          <option value="">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
      </div>

      {error && <p className="text-red-500 text-center mb-4">⚠️ {error}</p>}

      {movies.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      ) : (
        !error && (
          <p className="text-center text-gray-500 mt-5">No movies found.</p>
        )
      )}
    </div>
  );
}
