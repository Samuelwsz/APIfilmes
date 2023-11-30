import axios from "axios"

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
const searchURL = import.meta.env.VITE_SEARCH

export const getTopRatedMovies = async () => {
  const url = `${moviesURL}top_rated?${apiKey}`
  return axios.get(url)
}

export const getMovieById = async (id: string | undefined) => {
  const url = `${moviesURL}${id}?${apiKey}`
  return axios.get(url)
}

export const getSearchedMovies = async (query: string) => {
  const url = `${searchURL}?${apiKey}&query=${query}`
  return axios.get(url)
}
