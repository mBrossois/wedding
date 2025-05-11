<template>
    <TitleDynamic heading="h1" :title="$t('ROOMS')" />
    <div v-if="getRoomsLoaded" class="contents">
        <div class="flex justify-between">
            <AppParagraph :text="$t('ROOM_PRICE')" size="large" />
            <div>
                <AppParagraph class="original-price" text="&#8364;230,00" size="large" />
                <AppParagraph :text="`&#8364;${roomPrice}`" size="large" />
            </div>
        </div>
        <div>
            <AppParagraph :text="$t('ROOM_INFO')" size="small" />
            <AppParagraph :text="$t('EXTEND_STAY')" size="small" />
        </div>

        <AppButton :text="$t('ADD_ROOM')" @click="addRoom" />
        <AppParagraph v-if="getRoomsAvailable.length == 0 " :text="$t('NO_ROOMS_AVAILABE')" />

        <div class="rooms-table_container">
            <table class="rooms-table mb-1">
                <thead>
                    <tr>
                        <th class="primary-cell"><AppParagraph size="large" :text="$t('ROOM_NAME')" /></th>
                        <th class="tw-s"><AppParagraph size="large" :text="$t('CHILDBED')" /></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="room in getGuestRooms" :key="room.id">
                        <td><AppSelect :is-dark="true" :options="showRooms(room)" @onChange="updateRoom($event, room.id)"/></td>
                        <td><AppRadioBtn class="pl-1" :value="room.id.toString()" :name="room.id.toString()" :checked="!!room.childBed" @onclick="updateRoomChildbed(room.id)"  /></td>
                        <td><IconsDelete class="icon" @click="deleteRoom(room.id)"/></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div v-else class="flex justify-center">
        <AppLoader />
    </div>
</template>

<script setup lang="ts">
import { useGuestsStore } from '~/store/guests';
import { useRoomsStore } from '~/store/rooms';
import type { Room } from '~/types/rooms';

const guestStore = useGuestsStore()
const { getIsFreeRoom, getAuthId } = storeToRefs(guestStore)

const roomsStore = useRoomsStore()
const {getGuestRooms, getRoomsAvailable, getRoomsLoaded} = storeToRefs(roomsStore)
roomsStore.setRooms()

function showRooms(room: Room){
    const allRooms = getRoomsAvailable.value.map(room => {
        return { 
            value: room.id,
            title: room.roomTitle,
            isActive: false
         }
    })
    allRooms.sort().unshift({value: room.id, title: room.roomTitle, isActive: true})
    return allRooms
}

const roomPrice = getIsFreeRoom.value ? '0,00' : '115,00' 

async function updateRoomPatch(newRoom?: Room, oldRoom?: Room) {
    const response = await $fetch('/api/room', {
        method: 'patch',
        body: {
            newRoom,
            oldRoom,
            authId: getAuthId.value,
            amountRooms: getGuestRooms.value.length,
            bookedDate: newRoom ? newRoom.bookedDate : undefined
        },
        headers: useRequestHeaders(['cookie'])
    })
}

function addRoom() {
    const room = roomsStore.setGuestToRoom(getAuthId.value)
    if(room) {
        updateRoomPatch(room)
    }
}

function updateRoom(roomId: number, oldRoomId: number) {
    const {oldRoom, newRoom} = roomsStore.updateRoom(roomId, oldRoomId, getAuthId.value )
    if(newRoom) {
        updateRoomPatch(newRoom, oldRoom)
    }
}

function updateRoomChildbed(roomId: number) {
    const room = roomsStore.updateRoomChildbed(roomId)
    updateRoomPatch(room)
}

function deleteRoom(roomId: number) {
    const {oldRoom} = roomsStore.deleteRoom(roomId)
    updateRoomPatch(undefined, oldRoom)
}
</script>

<style>
.original-price {
    color: var(--gray-dark);
    text-decoration: line-through;
    text-decoration-thickness: 2px;
}

.icon {
    fill: var(--gray-darkest);
    transition: fill ease-in-out 200ms;
}
.icon:hover {
    cursor: pointer;
    fill: var(--gray-medium);

}

.primary-cell {
    width: 217px;
}

.rooms-table_container {
    overflow: scroll;
}

@media screen and (max-width: 768px) {
    .rooms-table {
        width: 400px;
    }
}

</style>