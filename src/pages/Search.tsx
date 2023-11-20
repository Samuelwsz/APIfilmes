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
  const query = searchParams.get("q")

  const getSearchedMovies = async (url: string) => {
    try {
      const res = await axios.get(url)
      setMovies(res.data.results)
      setError(null) // Limpa o estado de erro se a busca for bem-sucedida
    } catch (error) {
      console.error("Erro", error)
      setError("Não foi possível encontrar filmes. Tente novamente.") // Define a mensagem de erro no estado
    } finally {
    }
  }

  useEffect(() => {
    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`

    getSearchedMovies(searchWithQueryURL)
  }, [query])

  return (
    <div className="">
      <h1 className="py-8 text-center text-3xl font-serif">
        Bests movies : {query}
      </h1>
      {error && (
        <p className="text-center text-xl text-red-500 font-semibold">
          {error}
        </p>
      )}
      {movies.length === 0 && (
        <p className="text-center text-xl font-semibold">Loading...</p>
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
