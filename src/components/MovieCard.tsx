import { Link } from "react-router-dom"
import { Movie } from "../interfaces/IMovie"
import { StarIcon } from "@heroicons/react/24/solid"

interface MovieCardProps {
  movie: Movie
  showLink?: boolean
}

const imageUrl = import.meta.env.VITE_IMG

export default function MovieCard({ movie, showLink = true }: MovieCardProps) {
  return (
    <div className="max-w-sm mx-auto">
      <div className="my-2 bg-white rounded overflow-hidden shadow-lg">
        <img
          className="w-full"
          src={imageUrl + movie.poster_path}
          alt={movie.title}
        />
        <div className="p-4">
          <h1 className="text-xl font-bold mb-2">{movie.title}</h1>
          <div className="flex items-center gap-1 text-yellow-500">
            <StarIcon className="w-5 h-5" />
            <p>{movie.vote_average.toFixed(1)}</p>
          </div>
          {showLink && (
            <Link
              to={`movie/${movie.id}`}
              className="block mt-2 text-white font-semibold text-center bg-yellow-500 p-3 rounded-lg hover:bg-white hover:text-black hover:border-2 border-yellow-400"
            >
              Details
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
