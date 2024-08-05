import type { Confirmation } from "~/types/users"

export const useUsersStore = defineStore('users', () => {
    const lettercode = ref('')
    const getLettercode = computed(() => lettercode.value)
    function setLettercode(value: string) {
      lettercode.value = value
    }

    const confirmation: Ref<Confirmation> = ref()
    const getConfirmation = computed(() => confirmation.value)
    function setConfirmation(value: Confirmation) {
      confirmation.value = value
    }

    return { getLettercode, setLettercode, getConfirmation, setConfirmation }
  })