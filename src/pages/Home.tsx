import axios from "axios"
import { useEffect, useState } from "react"
import { Movie } from "../interfaces/IMovie"

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
    <div>
      <h1 className="py-3 text-center font-semibold text-2xl">
        Melhores filmes
      </h1>
      {topMovies &&
        topMovies.map((movie) => {
          return <p className="text-center my-1">{movie.title}</p>
        })}
    </div>
  )
}
