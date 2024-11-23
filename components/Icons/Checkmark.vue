<template>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :class="{'light': isLight}" class="path" d="M1 12.5L6.14092 18.4977C6.57218 19.0009 7.36465 18.953 7.73223 18.4017L19 1.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>

<script setup lang="ts">
defineProps<{
  isLight: boolean
}>()
</script>

<style scoped>
.path {
  stroke-dasharray: 30;
  stroke-dashoffset: 30;

  transition: all 500ms ease-in-out;
}

.path.light {
  stroke: white;
}
</style>