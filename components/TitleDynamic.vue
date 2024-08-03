<template>
    <component :is="heading" class="kurale-regular" :class="classes">{{ title }}</component>
</template>

<script setup lang="ts">
import type { Title } from '~/types/title';

const props = defineProps<Title>()

const headingFonts: {[key: string]: string} = {
    h1: 'font-32'
}

const classes = computed(() => headingFonts[props.heading])
</script>