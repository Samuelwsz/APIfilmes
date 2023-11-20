import NavBar from "./components/Navbar"
import "./global.css"
import { Outlet } from "react-router-dom"

export default function App() {
  return (
    <>
      <div>
        <NavBar />
        <Outlet />
      </div>
    </>
  )
}
