<template>
    <div class="full-width flex">
        <button v-for="page in pages" :key="page" class="table-nav-btn kurale-regular" :active="activePage === page - 1" @click="emitPage(page - 1)">{{ page }}</button>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    pages: number,
    activePage: number
}>()

const emits = defineEmits<{(e: 'onClick', page: number): void}>()

function emitPage(page: number) {
    emits('onClick', page)
}
</script>

<style scoped>
.table-nav-btn {
    cursor: pointer;
    border: none;
    border-right: 1px solid;
    height: 25px;
    width: 25px;
    background-color: none;
}

.table-nav-btn[active=true] {
    cursor: default;
}

.table-nav-btn[active=true],
.table-nav-btn:hover {
    background-color: var(--gray-darkest);
    color: var(--gray-lightest);
}
</style>