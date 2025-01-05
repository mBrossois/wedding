import type { Guest, GuestList } from "~/types/guests"

export const useGuestsStore = defineStore('guests', () => {
    const guestsBook: Ref<GuestList|undefined> = ref()
    const getGuestBookId = computed(() => guestsBook.value?.id)
    const getAuthId = computed(() => guestsBook.value?.authId || -1)
    const getIsComing = computed(() => guestsBook.value?.isComing)
    const getIsFreeRoom = computed(() => guestsBook.value?.isFreeRoom)
    const getImportantInformation = computed(() => guestsBook.value?.importantInformation)

    function setGuestComing(isComing: boolean) {
        if(guestsBook.value) {
            guestsBook.value.isComing = isComing
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

    function addGuest() {
        if(guestsBook.value && !guestsBook.value.guests) {
            guestsBook.value.guests = []
        } 

        if(guestsBook.value && guestsBook.value.guests) {
            const id = guestsBook.value.guests.length

            guestsBook.value.guests!.push({id: id ,firstName: '', lastName: '', isAdult: true})
            return id
        }

        return undefined
    }

    function updateGuestId(oldId: number, newId: number) {
        const guest = guestsBook.value?.guests?.find(guest => guest.id === oldId)
        if(guest) guest.id = newId
    }

    function updateGuest(value: string | boolean, variant: keyof Guest, id: number) {
        const guest = guestsBook.value?.guests?.find(guest => guest.id === id)
        if(guest && variant === 'isAdult') {
            guest.isAdult = !guest.isAdult
        }
        else if(guest) {
            guest[variant] = value
        }
        return guest
    }

    function deleteGuest(id: number) {
        if(guestsBook.value) guestsBook.value.guests = guestsBook.value.guests?.filter(guest => guest.id !== id)
    }

    function updateImportantInformation(value: string) {
        if(guestsBook.value) {
            guestsBook.value.importantInformation = value
        }
    }

    return { getIsComing, getGuestBookId, getAuthId, getGuests, getGuestAmount, getImportantInformation, setInitialGuestsBook, setGuestComing, addGuest, updateGuestId, updateGuest, deleteGuest, updateImportantInformation, getIsFreeRoom }
  })