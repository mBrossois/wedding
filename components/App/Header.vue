<template>
    <header class="header px-1">
        <div class="header-body flex">
            <p class="lavishly-yours-regular logo">Mark & Emma's wedding</p>
            <IconsHamburger :open="open" @click="toggleOpen" />
        </div>
        <AppMenu :open="open" />
        <hr class="section-line rounded-large" />
    </header>
</template>

<script setup lang="ts">
const open = ref(false);
function toggleOpen() {
    open.value = !open.value;
}
</script>

<style scoped>
.logo {
    font-size: 32px;
}

.header-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 68px;
}
</style>