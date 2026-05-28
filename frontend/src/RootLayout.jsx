import { Outlet } from "@tanstack/react-router"
import "./index.css"
import Navbar from "./components/NavBar"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getCurrentUser } from "./Apis/user.api"
import { login, logout } from "./store/slice/authSlice"

const RootLayout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const hydrateAuthState = async () => {
      try {
        const response = await getCurrentUser()
        const currentUser = response?.data?.user
        if (currentUser) {
          dispatch(login(currentUser))
          return
        }
        dispatch(logout())
      } catch (error) {
        dispatch(logout())
      }
    }

    hydrateAuthState()
  }, [dispatch])

  return (
   <>
   <Navbar/>
   <Outlet/>
   </>
  )
}

export default RootLayout
