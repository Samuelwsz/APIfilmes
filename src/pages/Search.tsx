import { useSearchParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"
import { useEffect, useState } from "react"
import { IMovie } from "../interfaces/IMovie"
import { getSearchedMovies } from "../axios/api"

export default function Search() {
  const [searchParams] = useSearchParams()
  const [movies, setMovies] = useState<IMovie[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [searched, setSearched] = useState<boolean>(false)

  const query = searchParams.get("q")

  useEffect(() => {
    setSearched(true) // Define como true para a primeira renderização
    window.history.replaceState(null, "", window.location.pathname)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (searched && query) {
        setLoading(true)
        try {
          const res = await getSearchedMovies(query)
          setMovies(res.data.results)
        } catch (error) {
          setError("Error")
        } finally {
          setLoading(false)
        }
      }
    }

    fetchData()
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
        <p className="text-3xl font-semibold text-red-400 text-center">
          {error}
        </p>
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
