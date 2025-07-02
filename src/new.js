//app.jsx

import { Routes, Route } from "react-router";
import { Home, MovieDetails, SearchResults } from "./pages";
import { Footer, Navbar } from "./component";
import "./App.css";
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
      <Footer />
    </>
  );
}



//Home.jsx

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

//MovieDetails.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchMovieDetails } from "../services/api";
import "./moviedetails.css";

export function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(id).then(setMovie);
    document.title=movie.Title
  }, [id]);

  function convertRuntime(runtimeStr) {
    // if (!runtimeStr || runtimeStr === "N/A") return "Not available";

    const minutes = parseInt(runtimeStr);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  }

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="container mx-auto md:pt-[100px] pt-[150px]">
      <h1 className="text-2xl font-bold mb-2">{movie.Title}</h1>
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="mb-4 movieposter w-full md:float-left md:w-1/5 md:mr-[30px]"
      />
      <p>
        <strong>Year:</strong> {movie.Year}
      </p>
      <p>
        <strong>Genre:</strong> {movie.Genre}
      </p>
      <p>
        <strong>IMDB Rating:</strong> ⭐ {movie.imdbRating}
      </p>
      <p>
        <strong>Runtime:</strong> {convertRuntime(movie.Runtime)}
      </p>{" "}
      <p>
        <strong>Box Office:</strong> {movie.BoxOffice}
      </p>
      <p>
        <strong>Actors:</strong> {movie.Actors}
      </p>
      <p>
        <strong>Director:</strong> {movie.Director}
      </p>
      <p>
        <strong>Released:</strong> {movie.Released}
      </p>
      <p className="mb-[50px]">
        <strong>Plot:</strong> {movie.Plot}
      </p>
    </div>
  );
}


//SarchResult.jsx

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


//api.js

const API_KEY = "772f91e";
const BASE_URL = "https://www.omdbapi.com/";
export const fetchMovies = async (query, page = 1, type = "") => {
  const res = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}${
      type && `&type=${type}`
    }`
  );
  const data = await res.json();
  return data;
};

export const fetchMovieDetails = async (id) => {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
  const data = await res.json();
  return data;
};


//MovieCard.jsx

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
              : "https://via.placeholder.com/150"
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

//NavBar.jsx

import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

export function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/results?query=${query}`);
    setQuery("");
  };

  return (
    <div div className="fixed w-[100%] ">
      <nav className="bg-gray-800 text-white p-4 md:mb-10 ">
        <div className="container mx-auto flex justify-between items-center">
          <NavLink to="/">
            <h1 className="text-xl font-bold">🎬 MovieApp</h1>
          </NavLink>

          <div className="flex items-center">
            <NavLink to="/">
              <p className=" md:mr-10">Home</p>
            </NavLink>

            <form
              onSubmit={handleSearch}
              className="flex gap-2 hidden md:block"
            >
              <input
                className="p-1 text-black  bg-white rounded lg:w-100  md:w-70 "
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="bg-blue-600 px-3 py-1 rounded ml-2">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className=" bg-[#fff] py-5 mb-10 block md:hidden">
        <div className="container mx-auto ">
          <form onSubmit={handleSearch} className="flex gap-2  ">
            <input
              className="p-1 text-black  border  rounded w-100"
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="bg-blue-600 px-3 py-1 rounded text-white">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


//Footer.jsx

export function Footer() {
  return (
    <div className="mt-5  bottom-0 w-[100%] overflow-hidden fixed bg-white">
      <div className=" border border-[#ccc]"></div>
      <p className="mx-auto container text-center my-[30px] ">@copyright MovieApp</p>
    </div>
  );
}
