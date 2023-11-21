import { useSearchParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"
import { useEffect, useState } from "react"
import { Movie } from "../interfaces/IMovie"
import axios from "axios"

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

export default function Search() {
  const [searchParams] = useSearchParams()

  const [movies, setMovies] = useState<Movie[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [searched, setSearched] = useState<boolean>(false)

  const query = searchParams.get("q")

  const getSearchedMovies = async (url: string) => {
    setLoading(true)
    try {
      const res = await axios.get(url)
      setMovies(res.data.results)
      setError(null) // Limpa o estado de erro se a busca for bem-sucedida
      setSearched(true)
    } catch (error) {
      setError("Não foi possível encontrar filmes. Tente novamente.") // Define a mensagem de erro no estado
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setSearched(true) // Define como true para a primeira renderização
    window.history.replaceState(null, "", window.location.pathname)
  }, [])

  useEffect(() => {
    if (searched && query) {
      const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`
      getSearchedMovies(searchWithQueryURL)
    }
  }, [query, searched])

  return (
    <div>
      <h1 className="py-8 text-center text-3xl font-serif">
        Bests movies : {query}
      </h1>
      {loading && (
        <p className="text-3xl font-semibold text-black text-center">
          Loading...
        </p>
      )}
      {error && (
        <p className="text-3xl font-semibold text-black text-center">{error}</p>
      )}

      <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-5 mb-5">
        {movies.length > 0 &&
          movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />
          })}
      </div>
    </div>
  )
}
