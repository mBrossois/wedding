<template>
    <div class="image-container">
        <IconsArch class="absolute arch" />
        <ImageBlock />
    </div>
</template>

<script setup lang="ts">
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