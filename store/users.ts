export const useUsersStore = defineStore('users', () => {
    const lettercode = ref('')
    const getLettercode = computed(() => lettercode.value)
    function setLettercode(value: string) {
      lettercode.value = value
    }
  
    return { getLettercode, setLettercode }
  })