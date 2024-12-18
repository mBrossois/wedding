<template>
    <span class="kurale-regular" :class="fontSize">{{ text }}</span>
</template>

<script setup lang="ts">
const props = defineProps<{
    text: String
    size?: string
}>()

const fontSize = props.size === 'large' ? 'font-20' : 'font-16'
</script>