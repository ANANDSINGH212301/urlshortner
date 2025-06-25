import { redirect } from "@tanstack/react-router"
import { login } from "../store/slice/authSlice"
import { getCurrentUser } from "../Apis/user.api"


export const checkAuth = ({ context }) => {
   try {
      const { store, queryClient } = context
      const user = queryClient.ensureQueryData({ querykey: ["currentUser"], queryFn: getCurrentUser, retry: false })
      store.dispatch(login(user))
      const {isAuthenticated} = store.getState().auth;
      if(!isAuthenticated) return false
      return true
   } catch {
      return redirect({ to: "/auth" })
   }
}