import type { GuestList } from "~/types/guests"

export const useGuestsStore = defineStore('guests', () => {
    const guestsBook: Ref<GuestList|undefined> = ref()
    const getGuestBookId = computed(() => guestsBook.value?.id)
    const getIsComing = computed(() => guestsBook.value?.isComing)
    function setGuestComing(isComing: boolean) {
        console.log(guestsBook.value)
        if(guestsBook.value) {
            guestsBook.value.isComing = isComing
            console.log(guestsBook.value.isComing)
        }
    }
    const getGuests = computed(() => guestsBook.value?.guests)
    const getGuestAmount = computed(() => guestsBook.value?.amounts)
    async function setInitialGuestsBook(email: string) {
        if(!guestsBook.value) {
            const { data, status } = await useFetch('/api/guests', {
                method: 'get',
                query: {
                    email: email
                },
                headers: useRequestHeaders(['cookie'])
            })

            if(status.value === 'success') {
                guestsBook.value = data.value as unknown as GuestList
            }
        }
    }

    return { getIsComing, getGuestBookId, getGuests, getGuestAmount, setInitialGuestsBook, setGuestComing }
  })