import { useUsersStore } from "~/store/users"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const usersStore = useUsersStore()

  if (!usersStore.getRole && to.path.includes('/admin')) {
    await usersStore.setRole()
    if(usersStore.getRole !== 'admin') {
      return navigateTo('/')
    }
  } else if(!usersStore.getRole) {
    usersStore.setRole()
  }
})
