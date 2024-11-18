<template>
    <table cellspacing="0" class="kurale-regular page-width table">
        <thead>
            <tr class="align-left">
                <th>Room title</th>
                <th>Amount</th>
                <th>Booked</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="full-cell" colspan="4">
                    <button class="add btn kurale-regular py-1 flex justify-center items-center gap-0_5" @click="openAddModal">
                        <img src="~/assets/img/add.svg" /> 
                        <span>Add rooms</span>
                    </button>
                </td>
            </tr>
            <tr v-for="(room, index) in rooms" :key="index" class="table-row align-left" :class="{ 'isTaken': room.bookedBy }" >
                <td :title="room.name" class="name">{{ room.name }}</td>
                <td>{{ room.amountOfPeople }}</td>
                <td>{{ room.bookedBy ? 'BOOKED' : 'OPEN' }}</td>
                <td class="justify-between">
                    <IconsEdit class="icon" @click="openEditModal(guest.attendanceData.id)"/>
                    <IconsDelete class="icon" @click="openDeleteModal(guest.attendanceData.id, guest.attendanceData.auth_id, guest.name)"/></td>
            </tr>
            <tr>
                <td class="full-cell" colspan="4">
                    <TableNavigation :pages="Number(pages)" :activePage="activePage" @onClick="changePage" />
                </td>
            </tr>
        </tbody>
    </table>
    <AppModal :isOpen="modal.isOpen" :title="modal.title" :buttons="modal.buttons" :size="modal.type === 'rooms' ? 'full' : 'small'" @onClose="closeModal" @btnClick="actionClick">
        <RoomsModal v-if="modal.type === 'rooms'" v-bind="roomFields" @updateRooms="updateRooms"/>
        <AppParagraph v-else :text="`Are you sure you want to permanantly delete ${rooms}?` " />
    </AppModal>
</template>

<script setup lang="ts">
import { useToasterStore } from '~/store/toaster';

const activePage = ref(0);

const { data: pages, refresh: refresPage } = await useFetch('/api/room-pages', {
    method: 'get',
    headers: useRequestHeaders(['cookie'])
})

const { data: rooms, status, refresh: refresRooms } = await useFetch('/api/rooms-on-page', {
    method: 'get',
    query: {
        page: activePage
    },
    headers: useRequestHeaders(['cookie'])
})

function changePage(page: number) {
    activePage.value = page
    console.log(activePage.value)
    refresRooms()
}

const defaultModalValue = {
    type: 'rooms',
    isOpen: false,
    title: 'Add rooms',
    buttons: [
        {title: 'cancel', action: 'close'},
        {title: 'save', action: 'save'}
    ]
}

const modal = ref(defaultModalValue)

function openAddModal() {
    modal.value = defaultModalValue
    modal.value.isOpen = true
}

function closeModal() {
    modal.value.isOpen = false
    resetFields()
}

function resetFields() {
    roomFields.value.name = ''
    roomFields.value.amountOfPeople = 3
    roomFields.value.timesCreate = 1
    roomFields.value.free = false
    roomFields.value.bookedBy = null
}

const roomDefaultValues = {
    name: '',
    amountOfPeople: 3,
    timesCreate: 1,
    free: false,
    bookedBy: null
}

const roomFields = ref(roomDefaultValues)

function updateRooms(type: string, value: string) {
    roomFields.value[type] = type === 'name' ? value : Number(value)
}

function actionClick(action: string) {
    switch(action) {
        case 'save':
            saveRooms()
            closeModal()
            break;
        default: {
            closeModal()
            break;
        }
    }
}

const toasterStore = useToasterStore()

async function saveRooms() {
    if(roomFields.value.timesCreate > 0) {
        const amountCreated = roomFields.value.timesCreate
        const result = await $fetch('/api/rooms', {
            method: 'post',
            body: {
                name: roomFields.value.name,
                amountOfPeople: roomFields.value.amountOfPeople,
                timesCreate: roomFields.value.timesCreate
            },
            headers: useRequestHeaders(['cookie'])
        })

        if(result === 'Added rooms') {
            refresRooms()
            refresPage()
            toasterStore.addToast({type: 'success', message: `We successfully added ${amountCreated} room(s)`})
            return 'success'
        }
    }
}

</script>

<style scoped>
.btn {
    border: none;
    background-color: transparent;
    text-align: center;
    cursor: pointer;
}

.btn.add {
    width: 100%;
}

.btn.add:hover {
    background-color: var(--gray-medium);
}

.align-left {
    text-align: left;
}

th {
    background-color: var(--gray-darkest);
    color: var(--gray-lightest);
}

td, .add span {
    color: var(--gray-darkest);
}

.table {
    border-color: var(--gray-darkest);
}

th,
td:not(.full-cell) {
    padding-left: .5rem;
    padding-right: .5rem;
}

td {
    border: 1px solid var(--gray-darkest);
}

.name {
    max-width: 108px;
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
}

.table-row .icon {
    fill: var(--gray-darkest);
    transition: fill ease-in-out 200ms;
}

.table-row .icon:hover {
    fill: var(--gray-medium);
    cursor: pointer;
}

.isTaken {
    background-color: var(--success-background);

    td {
        color: white;

        .icon {
            fill: white;
        }
    }
}
</style>