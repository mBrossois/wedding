<template>
    <div class="error-container" :class="{show: error}">
        <span v-show="error" class="error kurale-regular font-14">{{ error }}</span>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{error?: string}>()
</script>

<style scoped>
.error-container {
    height: 0;
    transition: all 300ms ease-in-out;
    overflow: hidden;
}

.error-container.show {
    height: 20px;
}

.error {
    color: var(--error);
}
</style>