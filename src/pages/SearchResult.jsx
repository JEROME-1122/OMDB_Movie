import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { fetchMovies } from "../services/api";
import { MovieCard } from "../component";

export function SearchResults() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("query");

  useEffect(() => {
    if (query) {
      fetchMovies(query).then((data) => {
        if (data.Search) setMovies(data.Search);
      });
    }
  }, [query]);

  return (
    <div className="container mx-auto md:pt-[120px] pt-[150px]">
      <div className=" grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 ">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onClick={() => navigate(`/movie/${movie.imdbID}`)}
            />
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
}
