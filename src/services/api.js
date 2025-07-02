const API_KEY = "772f91e";
const BASE_URL = "https://www.omdbapi.com/";


export const fetchMovies = async (query, page = 1, type = "") => {
  try {
    const url = `${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}${
      type ? `&type=${type}` : ""
    }`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "False") {
      throw new Error(data.Error || "Failed to fetch movies.");
    }

    return data; 
  } catch (error) {
    return { error: error.message };
  }
};


export const fetchMovieDetails = async (id) => {
  try {
    const url = `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "False") {
      throw new Error(data.Error || "Failed to fetch movie details.");
    }

    return data; 
  } catch (error) {
    return { error: error.message };
  }
};
