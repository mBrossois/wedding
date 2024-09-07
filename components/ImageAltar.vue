<template>
    <div class="image-container">
        <IconsArch class="absolute arch" />
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

.arch {
    left: 50%;
    transform: translateX(-50%);
}
</style>