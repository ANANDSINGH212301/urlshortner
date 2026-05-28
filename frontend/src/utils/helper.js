import { redirect } from "@tanstack/react-router"
import { login } from "../store/slice/authSlice"
import { getCurrentUser } from "../Apis/user.api"


export const checkAuth = async({ context }) => {
   try {
      const { store, queryClient } = context

      const response = await queryClient.ensureQueryData({ queryKey: ['currentUser'], queryFn: getCurrentUser })
      const currentUser = response?.data?.user
      if (!currentUser) {
         throw redirect({ to: '/auth' })
      }
      store.dispatch(login(currentUser))

      const { isAuthenticated } = store.getState().auth;
      if (!isAuthenticated) {
         throw redirect({ to: '/auth' })
      }
      return true
   } catch (error) {
      console.error(error)
      return redirect({ to: '/auth' })
   }
}