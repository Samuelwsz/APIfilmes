import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { VideoCameraIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router-dom"

export default function NavBar() {
  return (
    <header className="bg-black flex justify-between p-8  items-center flex-col md:flex-row">
      <Link to="/" className="text-2xl text-center mb-4 md:mb-0 text-yellow-400">
        <VideoCameraIcon className="w-6 h-6" /> Movies Lib
      </Link>
      <form>
        <div className="flex mb-2 md:mb-0">
          <input
            className="p-2 mr-1 rounded-md w-full md:w-64 md:mr-2 outline-none"
            type="text"
            placeholder="Search movie"
          />
          <button type="submit" className="bg-white px-3 rounded-md">
            <MagnifyingGlassIcon className="w-5 h-5 text-black" />
          </button>
        </div>
      </form>
    </header>
  )
}
