<template>
    <svg class="hamburger" :class="{open: open}" width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="path" style="--x: 3px; --y: 1px; --rotate: 50deg;" d="M1 1H17" stroke="#494949" stroke-width="2" stroke-linecap="round"/>
        <path class="path hide" style="--x: 8px; --y: -3px; --rotate: 50deg;" d="M1 7H17" stroke="#494949" stroke-width="2" stroke-linecap="round"/>
        <path class="path" style="--x: -8px; --y: 7px; --rotate: -50deg;" d="M1 13H17" stroke="#494949" stroke-width="2" stroke-linecap="round"/>
    </svg>
</template>

<script setup lang="ts">
defineProps<{
    open: Boolean
}>()
</script>

<style scoped>
.hamburger {
    cursor: pointer;
    overflow: visible;
}

.path {
    opacity: 1;
    transition: transform 250ms ease-in-out,
                opacity 15ms ease-in;
}

.hamburger.open > .path {
    transform: translate(var(--x), var(--y)) rotate(var(--rotate));
    transition: transform 250ms ease-in-out,
                opacity 15ms ease-in 240ms;
}

.hamburger.open > .path.hide {
    opacity: 0;
}
</style>