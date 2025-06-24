import { createRoute } from "@tanstack/react-router"
import HomePage from "../pages/HomePage"
import { rootRoute } from "./RouteTree"

export const homepageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage
})