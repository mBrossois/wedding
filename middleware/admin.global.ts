import { useUsersStore } from "~/store/users"
import { RoleEnum } from "~/types/users"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const usersStore = useUsersStore()

  if(!usersStore.getRole) {
    const { data: role } = await useFetch('/api/role', {
      method: 'get'
    })
  
    if(role.value && role.value === 'guest') {
        usersStore.setRole(RoleEnum.loggedIn)
    } else if(role.value === 'admin') {
        usersStore.setRole(RoleEnum.admin)
    }
  }
  if (to.path.includes('/admin') && usersStore.getRole !== 'admin') {
    return navigateTo('/')
  }
})
