import axios from "axios"
import { useEffect, useState } from "react"
import { Movie } from "../interfaces/IMovie"
import MovieCard from "../components/MovieCard"

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

export default function Home() {
  const [topMovies, setTopMovies] = useState<Movie[]>([])

  const getTopRatedMovies = async (url: string) => {
    try {
      const res = await axios.get(url)
      setTopMovies(res.data.results)
    } catch (error) {
      console.error("Erro", error)
    } finally {
    }
  }

  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}`

    getTopRatedMovies(topRatedUrl)
  }, [])

  return (
    <div className="">
      <h1 className="py-8 text-center text-3xl font-serif">Bests movies</h1>
      {topMovies.length === 0 && (
        <p className="text-center text-xl font-semibold">Loading...</p>
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
