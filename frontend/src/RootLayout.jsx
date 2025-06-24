import { Outlet } from "@tanstack/react-router"
import "./index.css"
import Navbar from "./components/NavBar"

const RootLayout = () => {
  return (
   <>
   <Navbar/>
   <Outlet/>
   </>
  )
}

export default RootLayout
