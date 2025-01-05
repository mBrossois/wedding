<template>
    <component :is="heading" class="kurale-regular" :class="classes">{{ title }}</component>
</template>

<script setup lang="ts">
import type { Title } from '~/types/loginPage.js';

const props = defineProps<Title>()

const headingFonts: {[key: string]: string} = {
    h1: 'font-32',
    h2: props.isLarge ? 'font-24' : 'font-20'
}

const classes = computed(() => headingFonts[props.heading])
</script>