import { NavLink } from "react-router";
import "./cardstyle.css";

export function MovieCard({ movie }) {
  return (
    <div className="cursor-pointer border border-[#ccc] rounded p-2 block ">
      <NavLink to={`/movie/${movie.imdbID}`}>
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://picsum.photos/200"
          }
          alt={movie.Title}
          className="w-full xl:h-[300px] lg:h-[400px] md:h-[500px]   object-cover"
        />
        <h2 className="font-bold mt-2 movie_title">{movie.Title}</h2>
        <p>{movie.Year}</p>
      </NavLink>
    </div>
  );
}
