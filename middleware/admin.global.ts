import { useUsersStore } from "~/store/users"
import { RoleEnum } from "~/types/users"

export default defineNuxtRouteMiddleware((to, from) => {
  // In a real app you would probably not redirect every route to `/`
  // however it is important to check `to.path` before redirecting or you
  // might get an infinite redirect loop
  const user = useSupabaseUser()

  if (to.path.includes('/admin') && user.value?.role !== 'supabase_admin') {
    return navigateTo('/')
  }
})
