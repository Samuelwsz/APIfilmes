import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IMovie } from "../interfaces/IMovie"
import MovieCard from "../components/MovieCard"
import {
  BanknotesIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid"
import { getMovieById } from "../axios/api"
/*
const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
*/
export default function Movie() {
  const { id } = useParams()
  const [movie, setMovie] = useState<IMovie | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  /*
  const getMovie = async (url: string) => {
    setLoading(true)
    try {
      const res = await axios.get(url)
      setMovie(res.data)
    } catch (error) {
      setError("Error")
    } finally {
      setLoading(false)
    }
  }*/

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await getMovieById(id)
        setMovie(res.data)
      } catch (error) {
        setError("Error")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatCurrency = (number: number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })
  }

  return (
    <div>
      {loading && (
        <p className=" text-3xl font-semibold text-black text-center">
          Loading...
        </p>
      )}
      {error && (
        <p className="text-red-500 font-semibold text-xl mt-2">{error}</p>
      )}
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <div className="w-96 m-auto text-lg">
            <p className="text-black text-center font-semibold text-lg">
              {movie.tagline}
            </p>
            <div className="flex gap-2 my-3">
              <div className="flex items-center gap-1">
                <BanknotesIcon className="w-5 h-5 text-yellow-500" />
                Budget:
              </div>
              <div>
                <p>{formatCurrency(movie.budget)}</p>
              </div>
            </div>
            <div className="flex gap-2 my-3">
              <div className="flex items-center gap-1">
                <CurrencyDollarIcon className="w-5 h-5 text-yellow-500" />
                Revenue:
              </div>
              <div>
                <p>{formatCurrency(movie.revenue)}</p>
              </div>
            </div>
            <div className="flex gap-2 my-3">
              <div className="flex items-center gap-1">
                <ClockIcon className="w-5 h-5 text-yellow-500" />
                Duration:
              </div>
              <div>
                <p>{movie.runtime} minutes</p>
              </div>
            </div>

            <div className="flex items-center gap-1 my-3">
              <DocumentTextIcon className="w-5 h-5 text-yellow-500" />
              Description:
            </div>
            <div>
              <p className="text-justify mb-3">{movie.overview}</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
