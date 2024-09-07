<template>
    <div class="img-block flex flex-centered">
        <div class="img-container relative">
            <img class="intro-img absolute" :src="imgSrc" height="4032" width="3024" :alt="img.alt"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Img } from '~/types/image'

const props = defineProps<{img: Img}>()
const images = import.meta.glob('@/assets/img/*.jpg', { eager: true })

const imgSrc = (images[props.img.src] as {default: string, type: string}).default
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