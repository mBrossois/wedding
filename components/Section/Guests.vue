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
            <tr v-for="guest in guests" class="align-left">
                <td :title="guest.name" class="name">{{ guest.name }}</td>
                <td>2</td>
                <td>0</td>
                <td>I X</td>
            </tr>
        </tbody>
    </table>
    <AddModal :isOpen="isAddModalOpen" @onClose="closeAddModal"/>
</template>

<script setup lang="ts">
const { data: guests, status } = await useFetch('/api/all-guests', {
    method: 'get',
    headers: useRequestHeaders(['cookie'])
})

const isAddModalOpen = ref(false)

function openAddModal() {
    isAddModalOpen.value = true
}

function closeAddModal() {
    isAddModalOpen.value = false
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
</style>