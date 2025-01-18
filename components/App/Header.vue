<template>
    <header :class="{'hide': hideHeader}" class="header px-1">
        <div class="header-body flex">
            <NuxtLink class="lavishly-yours-regular logo" :to="localePath('/')">Mark & Emma's wedding</NuxtLink>
            <IconsHamburger :open="open" @click="toggleOpen" />
        </div>
        <AppMenu :open="open" @on-close="toggleOpen"/>
        <div v-if="open" class="absolute overlay" @click="toggleOpen"></div>
        <hr class="section-line rounded-large" />
    </header>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

const open = ref(false);
function toggleOpen() {
    open.value = !open.value;
}

const currentPos = ref(0)
const hideHeader = ref(false)

function handleScroll() {
        setTimeout(() => {
            if(currentPos.value !== window.scrollY && open.value === false) {
                hideHeader.value = currentPos.value < window.scrollY
                currentPos.value = window.scrollY
            }
    }, 100)
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
})
</script>

<style scoped>
.header {
    position: sticky;
    top: 0;
    z-index: 10000;
    background-color: var(--gray-light);
    transform: translateY(0);
    transition: transform 350ms ease-in-out;
}

.header.hide {
    transform: translateY(-120px);
}

.logo {
    font-size: 32px;
    text-decoration: none;
    color: black;
}

.header-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 68px;
}

.overlay {
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    cursor: pointer;
}
</style>