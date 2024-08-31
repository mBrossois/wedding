import type { Roles } from "~/types/users"

export const useUsersStore = defineStore('users', () => {
    const lettercode = ref('')
    const getLettercode = computed(() => lettercode.value)
    function setLettercode(value: string) {
      lettercode.value = value
    }

    const role: Ref<Roles> = ref(undefined)
    const getRole = computed(() => role.value)
    function setRole(value: Roles) {
      role.value = value
    }

    return { getLettercode, setLettercode, getRole, setRole }
  })