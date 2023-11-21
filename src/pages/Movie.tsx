import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IMovie } from "../interfaces/IMovie"
import axios from "axios"
import MovieCard from "../components/MovieCard"

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

export default function Movie() {
  const { id } = useParams()
  const [movie, setMovie] = useState<IMovie | null>(null)

  const getMovie = async (url: string) => {
    try {
      const res = await axios.get(url)
      setMovie(res.data)
    } catch (error) {
    } finally {
    }
  }

  useEffect(() => {
    const movieURL = `${moviesURL}${id}?${apiKey}`

    getMovie(movieURL)
  }, [])

  return (
    <div>
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
        </>
      )}
    </div>
  )
}
