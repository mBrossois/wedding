<template>
    <div class="image-container relative">
        <div class="altar-border absolute"></div>
        <div class="altar-overlay absolute"></div>
        <ImageBlock :img="img" />
    </div>
</template>

<script setup lang="ts">
import type { Img } from '~/types/image';

defineProps<{img: Img}>()
</script>

<style scoped>
.image-container {
    height: 483px;
}

.altar-border {
    border: 1px solid var(--gray-medium);
    width: 358px;
    height: 402px;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 250px;
}

.altar-overlay {
    background: linear-gradient(180deg, rgba(232, 229, 229, 0) 0%, #E8E5E5 30%, #E8E5E5 100%);
    width: 390px;
    height: 303px;
    top: 140px;
    left: 50%;
    transform: translateX(-50%);
}
</style>