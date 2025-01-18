<template>
    <div v-if="!lettercodes" class="table-container pt-2 flex justify-center">
        <AppLoader :light="true" />
    </div>
    <div class="table-container" v-else>
        <table cellspacing="0" class="kurale-regular table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Lettercode</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="lettercode, index in lettercodes" :key="index">
                    <td><div class="cell"><AppParagraph v-for="name, index of lettercode?.guests || []" :key="index" :text="name" /></div></td>
                    <td><div class="cell">{{lettercode?.lettercode}}</div></td>
                </tr>
            </tbody>
        </table> 
    </div>
</template>

<script setup lang="ts">
const { data: lettercodes } = await useFetch<Array<{lettercode: string, guests: string[]}>>('/api/lettercodes', {
    method: 'get',
    headers: useRequestHeaders(['cookie']),
})
</script>

<style scoped>
th {
    background-color: var(--gray-lightest);
    color: var(--gray-darkest);
}
.table {
    border-color: var(--gray-lightest);
}

th,
td:not(.full-cell) {
    padding-left: .5rem;
    padding-right: .5rem;
}

td {
    border: 1px solid var(--gray-lightest);
}

.cell {
    width: 122px;
    overflow: hidden;
}

.table-container {
    height: 320px;
    overflow: scroll;
}
</style>