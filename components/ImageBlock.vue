<template>
    <div class="img-block flex flex-centered">
        <div class="img-container relative">
            <NuxtImg class="intro-img absolute" provider="cloudinary" loading="lazy" src="/v1/wedding/us_ny" sizes="789" alt="Mark & Emma in NY"/>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.img-block {
    width: 100%;
    height: 513px;
}

.img-container {
    width: 326px;
    height: 476px;

    border-radius: 200px;
    border: 1px solid var(--gray-medium);

    overflow: hidden;
}

.intro-img {
    height: 771px;
    width: 578px;

    top: -180px;
    left: -90px;
}
</style>