import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { VideoCameraIcon } from "@heroicons/react/24/solid"
import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function NavBar() {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!search) return

    navigate(`/search?q=${search}`)
    setSearch('')
  }

  return (
    <header className="bg-black flex justify-between p-8  items-center flex-col md:flex-row">
      <Link
        to="/"
        className="text-4xl text-center mb-4 md:mb-0 text-yellow-400"
      >
        <VideoCameraIcon className="w-8 h-8" /> Movies Lib
      </Link>
      <form onSubmit={handleSubmit}>
        <div className="flex mb-2 md:mb-0">
          <input
            className="p-2 mr-1 rounded-md w-full md:w-64 md:mr-2 outline-none"
            type="text"
            placeholder="Search movie"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="bg-white px-3 rounded-md">
            <MagnifyingGlassIcon className="w-5 h-5 text-black" />
          </button>
        </div>
      </form>
    </header>
  )
}
