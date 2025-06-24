import { Outlet } from "@tanstack/react-router"
import "./index.css"
import AuthPage from "./pages/AuthPage"
import HomePage from "./pages/HomePage"

const RootLayout = () => {
  return (
   <>
   <Outlet/>
   </>
  )
}

export default RootLayout
