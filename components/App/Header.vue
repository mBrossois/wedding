<template>
    <header :class="{'hide': hideHeader}" class="header px-1">
        <div class="header-body flex">
            <NuxtLink class="lavishly-yours-regular logo flex items-center gap-1" :to="localePath('/')"><NuxtImg provider="cloudinary" src="/v1/wedding/iconLogo" sizes="32" width="32" height="32" alt="Logo" preload/> Mark & Emma's wedding</NuxtLink>
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

    if(open.value) {
        document.documentElement.style.overflow = 'hidden'
        return
    }
    document.documentElement.style.overflow = 'auto'
}

const currentPos = ref(0)
const hideHeader = ref(false)

function handleScroll() {
        setTimeout(() => {
            if(currentPos.value !== window.scrollY && open.value === false) {
                hideHeader.value = currentPos.value < window.scrollY && window.scrollY > 16
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
    font-size: 28px;
    text-decoration: none;
    color: black;
}

@media screen and (min-width: 768px) {
    .logo {
        font-size: 32px;
    }
}

.header-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 68px;
}

.overlay {
    width: 100%;
    height: 100vh;
    z-index: 100;
    top: 0;
    left: 0;
    cursor: pointer;
}
</style>