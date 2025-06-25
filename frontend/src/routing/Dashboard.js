import { createRoute } from "@tanstack/react-router"
import DashboardPage from "../pages/DashboardPage"
import { rootRoute } from "./RouteTree"
import { checkAuth } from "../utils/helper.js"

export const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: DashboardPage,
    beforeLoad: async({context}) => {
        return checkAuth({context})
    }
})