import { useEffect, useState } from "react"
import { IMovie } from "../interfaces/IMovie"
import MovieCard from "../components/MovieCard"
import { getTopRatedMovies } from "../axios/api"

export default function Home() {
  const [topMovies, setTopMovies] = useState<IMovie[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await getTopRatedMovies()
        setTopMovies(res.data.results)
        setError(null)
      } catch (error) {
        setError("Error")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [getTopRatedMovies])

  return (
    <div className="">
      <h1 className="py-8 text-center text-3xl font-serif">Bests movies</h1>
      {loading && (
        <p className=" text-3xl font-semibold text-black text-center">
          Loading...
        </p>
      )}
      {error && (
        <p className="text-red-500 font-semibold text-xl mt-2">{error}</p>
      )}

      <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-5 mb-5">
        {topMovies.length > 0 &&
          topMovies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />
          })}
      </div>
    </div>
  )
}
