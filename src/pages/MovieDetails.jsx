import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchMovieDetails } from "../services/api";


export function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMovieDetails(id).then((data) => {
      if (data.error) {
        setError(data.error);
        setMovie(null);
      } else {
        setMovie(data);
        document.title = data.Title;
      }
    });
  }, [id]);

  if (error) return <p className="text-red-500 text-center mt-[150px]">⚠️ {error}</p>;
  if (!movie) return <p className="text-center mt-[150px]">Loading...</p>;

  return (
    <div className="container mx-auto md:pt-[100px] pt-[150px]">
      <h1 className="text-2xl font-bold mb-2">{movie.Title}</h1>
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="mb-4 movieposter w-full md:float-left md:w-1/5 md:mr-[30px]"
      />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>IMDB Rating:</strong> ⭐ {movie.imdbRating}</p>
      <p><strong>Runtime:</strong> {movie.Runtime}</p>
      <p><strong>Box Office:</strong> {movie.BoxOffice}</p>
      <p><strong>Actors:</strong> {movie.Actors}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Released:</strong> {movie.Released}</p>
      <p className="mb-[50px]"><strong>Plot:</strong> {movie.Plot}</p>
    </div>
  );
}
