<template>
    <p class="kurale-regular font-16">{{ text }}</p>
</template>

<script setup lang="ts">
defineProps<{
    text: String
}>()
</script>