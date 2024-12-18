<template>
    <component :is="to ? NuxtLink : 'button'" :class="[fontSize, {'no-arrow': noArrow}]" class="link kurale-regular" :to="to" :target="target" @click="onClick">
        {{ text }} 
        <IconsArrow />
    </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components';
const props = withDefaults(defineProps<{
    to?: string,
    text: string,
    target?: string
    size?: 'large' | 'medium',
    noArrow?: boolean
}>(),
    {
        target: '_self'
    }
)

const fontSize = props.size === 'large' ? 'font-20' : 'font-16'

const emits = defineEmits<{
  (e: 'onClick'): void
}>()

function onClick() {
    emits('onClick')
}
</script>

<style scoped>
.link {
    color: var(--gray-darkest);
    text-decoration: underline;
    background-color: transparent;
    border: none;
    text-align: left;

    cursor: pointer;
}

.link:hover .arrow {
    transform: translateX(.25rem);
    transition: transform 200ms ease-in-out;
}

.link:hover:not(.no-arrow) .arrow:deep() > .path {
    stroke-dashoffset: 0;        
    transition: all 200ms ease-in-out var(--delay);
}
</style>