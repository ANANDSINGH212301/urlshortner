import RootLayout from "../RootLayout"
import { createRootRoute } from "@tanstack/react-router"
import { authRoute } from "./Auth.route"
import { homepageRoute } from "./HomePage"
import { dashboardRoute } from "./Dashboard"

export const rootRoute = createRootRoute({
  component: RootLayout 
})
export const routeTree = rootRoute.addChildren([authRoute, homepageRoute,dashboardRoute])


