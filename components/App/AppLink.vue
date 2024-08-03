<template>
    <NuxtLink class="link kurale-regular font-16" :to="to">{{ text }}</NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
    to: string,
    text: string
}>()
</script>

<style scoped>
.link {
    position: relative;
    color: var(--gray-darkest);
    text-decoration: none;
    overflow: hidden;
}

.link::after {
    content: '';
    position: absolute;
    border-bottom: 1px solid black;
    left: 50%;
    top: 0;
    right: 50%;
    bottom: 0;

    transition: all ease-in-out 500ms;
}

.link:hover::after {
    left: 0;
    right: 0;
}
</style>