<template>
    <table cellspacing="0" class="kurale-regular page-width table">
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
            <tr v-for="guest in guests" :key="guest.name" class="align-left" :class="{ 'coming': guest.attendanceData.is_coming }" >
                <td :title="guest.name" class="name">{{ guest.name }}</td>
                <td>{{ guest.attendanceData.adults + guest.attendanceData.children }}</td>
                <td>{{ guest.attendanceData.rooms }}</td>
                <td>I X</td>
            </tr>
            <tr>
                <td class="full-cell" colspan="4">
                    <TableNavigation :pages="pages" :activePage="activePage" @onClick="changePage" />
                </td>
            </tr>
        </tbody>
    </table>
    <AddModal :isOpen="isAddModalOpen" @onClose="closeAddModal"/>
</template>

<script setup lang="ts">
let activePage = 0;

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

const isAddModalOpen = ref(false)

function openAddModal() {
    isAddModalOpen.value = true
}

function closeAddModal() {
    isAddModalOpen.value = false
}

function changePage(page: number) {
    activePage = page
    refresGuests()
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

.coming {
    background-color: var(--success-background);

    td {
        color: white;
    }
}
</style>