<template>
    <table cellspacing="0" class="kurale-regular table">
        <thead>
            <tr class="align-left">
                <th>Name</th>
                <th>Amount</th>
                <th>Rooms</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="full-cell" colspan="4">
                    <button class="add btn kurale-regular py-1 flex justify-center items-center gap-0_5" @click="openAddModal">
                        <img src="~/assets/img/add.svg" /> 
                        <span>Add guests</span>
                    </button>
                </td>
            </tr>
            <tr v-for="guest in guests" :key="guest.name" class="table-row align-left" :class="{ 'coming': guest.attendanceData.is_coming }" >
                <td :title="guest.name" class="name">{{ guest.name }}</td>
                <td>{{ guest.attendanceData.adults + guest.attendanceData.children }}</td>
                <td>{{ guest.attendanceData.rooms }}</td>
                <td class="justify-between">
                    <IconsEdit class="icon" @click="openEditModal(guest.attendanceData.id, guest.attendanceData.auth_id)"/>
                    <IconsDelete class="icon" @click="openDeleteModal(guest.attendanceData.id, guest.attendanceData.auth_id, guest.name)"/></td>
            </tr>
            <tr>
                <td class="full-cell" colspan="4">
                    <TableNavigation :pages="pages" :activePage="activePage" @onClick="changePage" />
                </td>
            </tr>
        </tbody>
    </table>
    <div class="flex justify-center mt-2">
        <AppButton text="Show letter-codes" @click="showLettercodes" />
    </div>

    <AppModal :isOpen="modal.isOpen" :title="modal.title" :buttons="modal.buttons" :size="modal.size" @onClose="closeGuestModal" @btnClick="actionClick">
        <GuestModal v-if="modal.type === 'guests'" 
            :amounts="amounts" 
            :form="form"
            :rooms-available="rooms"
            :active-room-name="activeRoomName"
            @update-amounts="updateAmounts"
            @update-form="updateForm"
            >
        </GuestModal>
        <LettercodesList v-else-if="modal.type === 'letter-codes'" />
        <AppParagraph v-else :text="`Are you sure you want to permanantly delete ${deleteName}?` " />
    </AppModal>
</template>

<script setup lang="ts">
import type { Guest, selectAmounts } from '~/types/guests';
import type { Ref } from 'vue';
import { ref } from 'vue';
import { useToasterStore } from '~/store/toaster';

const emits = defineEmits<{
    (e: 'done'): void
}>()

const activePage = ref(0);

const { data: pages, refresh: refresPage } = await useFetch('/api/guest-pages', {
    method: 'get',
    headers: useRequestHeaders(['cookie'])
})

const { data: guests, status, refresh: refresGuests } = await useFetch('/api/guests-on-page', {
    method: 'get',
    query: {
        page: activePage
    },
    headers: useRequestHeaders(['cookie'])
})

const { data: rooms } = await useFetch('/api/rooms-available', {
    method: 'get',
    headers: useRequestHeaders(['cookie'])
})

function changePage(page: number) {
    activePage.value = page
    refresGuests()
}

const defaultModalValue = {
    type: 'guests',
    isOpen: false,
    title: 'Add guests',
    size: 'full',
    buttons: [
        {title: 'save & close', action: 'save_close'},
        {title: 'save & add another', action: 'save_another'}
    ]
}

const modal = ref(defaultModalValue)

function openAddModal() {
    modal.value = defaultModalValue
    modal.value.isOpen = true;
}

function closeGuestModal() {
    modal.value.isOpen = false
    resetFields()
}

function resetFields () {
    form.value.adults = []
    form.value.children = []
    form.value.rooms = []
    form.value.isFreeRoom = false
    form.value.isComing = false
    activeRoomName.value = []
    guestBookId = 0
    authId = 0
    deleteName.value = ''
    setEmptyAmounts()
}

const activeRoomName = ref([])
let guestBookId = 0
async function openEditModal(id: number, authId: number) {
    modal.value = { 
        type: 'guests',
        isOpen: true,
        title: 'Edit guests',
        size: 'full',
        buttons: [
            {title: 'cancel', action: 'close'},
            {title: 'update', action: 'patch'}
        ]
    }

    const guestBook = guests.value?.find(guestBookEntry => guestBookEntry.attendanceData.id === id).attendanceData
    form.value.isFreeRoom = guestBook.free_room
    form.value.isComing = guestBook.is_coming

    guestBookId = id

    interface Guest {
        id: number,
        first_name: string,
        last_name: string,
        is_adult: boolean
    }

    const roomsResult = await $fetch<Array<number>>('/api/rooms-by-id', {
        method: 'get',
        query: {
            auth_id: authId
        },
        headers: useRequestHeaders(['cookie'])
    })

    let rooms = 0
    for(const room of roomsResult) {
        rooms++
        form.value.rooms.push({id: room.id, childBed: room.child_bed})
        activeRoomName.value.push(room.room_title)
    }

    amounts.value.rooms.find(amount => amount.isActive === true)!.isActive = false
    amounts.value.rooms[rooms].isActive = true

    const guestResponse = await $fetch<Array<Guest>>('/api/guest-by-id', {
        method: 'get',
        query: {
            guest_book_id: id
        },
        headers: useRequestHeaders(['cookie'])
    })

    let adults = 0
    let children = 0
    for(const guest of guestResponse) {
        if(guest.is_adult) {
            adults++
            form.value.adults.push({
                firstName: guest.first_name,
                lastName: guest.last_name,
            })
        } else {
            children++
            form.value.children.push({
                firstName: guest.first_name,
                lastName: guest.last_name,
            })
        }
    }

    
    amounts.value.adults.find(amount => amount.isActive === true)!.isActive = false
    amounts.value.adults[adults].isActive = true

    amounts.value.children.find(amount => amount.isActive === true)!.isActive = false
    amounts.value.children[children].isActive = true
}

let authId = 0
const deleteName = ref('')

function openDeleteModal(guestId: number, authIdValue: number, name: string) {
    modal.value = { 
        type: 'delete',
        isOpen: true,
        title: 'Delete guests',
        size: 'small',
        buttons: [
            {title: 'cancel', action: 'close'},
            {title: 'delete', action: 'delete'}
        ]
    }

    guestBookId = guestId
    authId = authIdValue
    deleteName.value = name
}

const form: Ref<{adults: Array<Guest>, children: Array<Guest>, rooms: Array<number>, isFreeRoom: boolean, isComing: boolean}> = ref({
    adults: [],
    children: [],
    rooms: [],
    isFreeRoom: false,
    isComing: false
})

function updateForm(lifeHood: string, value: Array<Guest>) {
    form.value[lifeHood] = value
}

const amounts: Ref<{
    adults: selectAmounts
    children: selectAmounts
    rooms: selectAmounts
}> = ref({
    adults: [],
    children: [],
    rooms: []
})

function setEmptyAmounts() {
    amounts.value = {
        adults: [],
        children: [],
        rooms: []
    }

    for(let i = 0; i <= 5; i++) {
        amounts.value.adults.push({
            value: i,
            title: i.toString(),
            isActive: i === 0
        }) 
        amounts.value.children.push({
            value: i,
            title: i.toString(),
            isActive: i === 0
        }) 
        amounts.value.rooms.push({
            value: i,
            title: i.toString(),
            isActive: i === 0
        }) 
    }
}

setEmptyAmounts()

function updateAmounts(lifeHood: string, value: selectAmounts) {
    amounts.value[lifeHood] = value
}

function actionClick(action: string) {
    switch(action) {
        case 'save_close':
            saveGuests()
            closeGuestModal()
            break;
        case 'save_another':
            saveGuests()
            resetFields()
            break;
        case 'patch':
            updateGuests()
            resetFields()
            closeGuestModal()
            break;
        case 'delete':
            deleteGuests()
            resetFields()
        default: {
            closeGuestModal()
            break;
        }
    }
}
const toasterStore = useToasterStore()

async function saveGuests() {
    if(form.value.adults.length > 0 || form.value.children.length > 0) {
        const name = form.value.adults[0].firstName + ' ' + form.value.adults[0].lastName
        const result = await $fetch('/api/guests', {
            method: 'post',
            body: {
                adults: form.value.adults.length,
                children: form.value.children.length,
                rooms: form.value.rooms.length,
                form: form.value
            },
            headers: useRequestHeaders(['cookie'])
        })

        if(result === 'Added guests') {
            refresGuests()
            refresPage()
            toasterStore.addToast({type: 'success', message: `We successfully added ${name}`})
            return 'success'
        }
    }
}

async function updateGuests() {
    if(form.value.adults.length > 0 || form.value.children.length > 0) {
        const name = form.value.adults[0].firstName + ' ' + form.value.adults[0].lastName
        const result = await $fetch('/api/guests', {
            method: 'put',
            body: {
                form: form.value,
                guest_book_id: guestBookId
            },
            headers: useRequestHeaders(['cookie'])
        })

        if(result === 'Updated guests') {
            refresGuests()
            refresPage()
            
            toasterStore.addToast({type: 'success', message: `We successfully updated ${name}`})
            return 'success'
        }
    }
}

async function deleteGuests() {
    const name = deleteName.value
    const result = await $fetch('/api/guests', {
        method: 'delete',
        body: {
            guest_book_id: guestBookId,
            auth_id: authId
        },
        headers: useRequestHeaders(['cookie'])
    })

    if(result === 'Deleted guests') {
        refresGuests()
        refresPage()
        toasterStore.addToast({type: 'success', message: `We successfully deleted ${name}`})
        return 'success'
    }
}

function showLettercodes() {
    modal.value = { 
        type: 'letter-codes',
        isOpen: true,
        title: 'Letter codes',
        size: 'full',
        buttons: [
            {title: 'close', action: 'close'},
        ]
    }
}

emits('done')
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
    width: calc(var(--page-width) - 2rem);
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

.coming {
    background-color: var(--success-background);

    td {
        color: white;

        .icon {
            fill: white;
        }
    }
}
</style>