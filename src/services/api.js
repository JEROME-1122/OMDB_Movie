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
