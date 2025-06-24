import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./RouteTree"
import AuthPage from "../pages/AuthPage"


export const authRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/auth',
    component: AuthPage
})

