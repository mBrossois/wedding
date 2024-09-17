<template>
    <component :is="to ? NuxtLink : 'button'" :class="fontSize" class="link kurale-regular" :to="to" @click="onClick">
        {{ text }} 
        <IconsArrow />
    </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components';
const props = defineProps<{
    to?: string,
    text: string
    size?: 'large' | 'medium'
}>()

const fontSize = props.size === 'large' ? 'font-20' : 'font-16'

const emits = defineEmits<{
  (e: 'click'): void
}>()

function onClick() {
    emits('click')
}
</script>

<style scoped>
.link {
    color: var(--gray-darkest);
    text-decoration: none;
    background-color: transparent;
    border: none;
    text-align: left;

    cursor: pointer;
}

.link:hover .arrow {
    transform: translateX(.25rem);
    transition: transform 200ms ease-in-out;
}

.link:hover .arrow:deep() > .path {
    stroke-dashoffset: 0;        
    transition: all 200ms ease-in-out var(--delay);
}
</style>