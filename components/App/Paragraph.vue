<template>
    <p class="kurale-regular" :class="fontSize">{{ text }}</p>
</template>

<script setup lang="ts">
const props = defineProps<{
    text: String
    size?: 'small' | 'medium' | 'large'
}>()

const fontSizes = {
    'small': 'font-14',
    'medium': 'font-16',
    'large': 'font-20'
}

const fontSize = props.size ? fontSizes[props.size] : 'font-16'
</script>