import { useEffect, useState } from "react";
import { fetchMovies } from "../services/api";
import { MovieCard } from "../component";


export function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const popularKeywords = ["avengers", "batman", "superman", "star wars"];

    async function loadPopularMovies() {
      const allResults = [];

      for (const keyword of popularKeywords) {
        const data = await fetchMovies(keyword);
        if (data.Search) {
          allResults.push(...data.Search);
        }
      }

      setMovies(allResults);
    }

    loadPopularMovies();
  }, []);

  return (
    <div className=" container  mx-auto  ">
      {movies.length === 0 ? (
        <p className="text-center text-gray-500">No movies found.</p>
      ) : (
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4  md:pt-[120px] pt-[150px]">
          {movies.map((movie) => (
    

              <MovieCard movie={movie} key={movie.imdbID}  />
     
          ))}
        </div>
      )}
    </div>
  );
}
