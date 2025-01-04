import type { Ref } from "vue"
import type { Room } from "~/types/rooms"
import { useGuestsStore } from "./guests"
export const useRoomsStore = defineStore('rooms', () => {
    const allRooms: Ref<Array<Room>> = ref([])
    const roomsLoaded = ref(false)
    
    const getRoomsAvailable = computed(() => allRooms.value
                                                .filter(room => !room.bookedBy)
                                                .sort((a, b) => a.roomTitle.localeCompare(b.roomTitle))
                                            )
    const getGuestRooms = computed(() => {
        const guestStore = useGuestsStore()
        const guestRooms = allRooms.value.filter(room => room.bookedBy === guestStore.getAuthId)
        const sortedRooms = guestRooms.sort((a, b) => {
            if(a.bookedDate && b.bookedDate) {
                const dateA = new Date(a.bookedDate);
                const dateB = new Date(b.bookedDate);
                return dateA - dateB
            }
            return a - b
        })
        return sortedRooms
    })
    const getRoomsLoaded = computed(() => roomsLoaded.value)

    async function setRooms() {
        const rooms = await $fetch<Array<Room>>('/api/rooms-all', {
            method: 'get',
            headers: useRequestHeaders(['cookie'])
        })

        if(rooms) {
            allRooms.value = rooms
            roomsLoaded.value = true
        }
    }

    function setGuestToRoom(authId: number) {
        const freeRoom = allRooms.value.find(room => !room.bookedBy)
        if(freeRoom) {
            freeRoom.bookedBy = authId
            freeRoom.bookedDate = new Date()
            return freeRoom
        }
    }

    function deleteRoom(roomId: number) {
        const oldRoom = allRooms.value.find(room => room.id === roomId)
        const oldChildBed = oldRoom?.childBed
        const oldDate = oldRoom?.bookedDate
        if(oldRoom) {
            oldRoom.bookedBy = undefined
            oldRoom.childBed = undefined
            oldRoom.bookedDate = undefined
            return {oldRoom, oldChildBed, oldDate}
        }
        return {oldRoom: undefined, oldChildBed: undefined, oldDate: undefined}
    }

    function updateRoom(roomId: number, oldRoomId: number, authId: number) {
        const {oldRoom, oldChildBed, oldDate} = deleteRoom(oldRoomId)
        const newRoom = allRooms.value.find(room => room.id === roomId)
        if(newRoom) {
            newRoom.bookedBy = authId
            newRoom.childBed = oldChildBed
            newRoom.bookedDate = oldDate
        }

        return {oldRoom, newRoom}
    }


    function updateRoomChildbed(roomId: number) {
        const room = allRooms.value.find(room => room.id === roomId)
        if(room) {
            room.childBed = !room.childBed
            return room
        }
    }

    return { getRoomsAvailable, getGuestRooms, getRoomsLoaded, setRooms, setGuestToRoom, updateRoom, updateRoomChildbed, deleteRoom }
})