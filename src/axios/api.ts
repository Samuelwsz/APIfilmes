import axios from "axios"
/*
const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
const searchURL = import.meta.env.VITE_SEARCH
*/

const moviesURL = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie/",
})

const apiKey = "8e5ab5c417b6e8abe9ee8276d7b2f1d7"

const searchURL = axios.create({
  baseURL: "https://api.themoviedb.org/3/search/",
})

export const getTopRatedMovies = async () => {
  const url = `top_rated?api_key=${apiKey}`
  return moviesURL.get(url)
}

export const getMovieById = async (id: string | undefined) => {
  const url = `${id}?api_key=${apiKey}`
  return moviesURL.get(url)
}

export const getSearchedMovies = async (query: string) => {
  const url = `movie?api_key=${apiKey}&query=${query}`
  return searchURL.get(url)
}
