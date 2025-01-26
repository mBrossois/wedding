import { RoleEnum, type Roles } from "~/types/users"

export const useUsersStore = defineStore('users', () => {
    const lettercode = ref('')
    const getLettercode = computed(() => lettercode.value)
    function setLettercode(value: string) {
      lettercode.value = value
    }

    const role: Ref<Roles> = ref(undefined)
    const getRole = computed(() => role.value)
    async function setRole() {
      const { data } = await useFetch('/api/role', {
        method: 'get'
      })
      if(data.value && data.value === 'guest') {
          role.value = RoleEnum.loggedIn
      } 
      else if(data.value === 'admin') {
          role.value = RoleEnum.admin
      }
    }

    return { getLettercode, setLettercode, getRole, setRole }
  })