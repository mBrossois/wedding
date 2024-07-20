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
    height: 488px;

    border-radius: 200px;
    -webkit-box-shadow: 1px 2px 5px 0px #0000003b;
    box-shadow: 1px 2px 5px 0px #0000003b;

    overflow: hidden;
}

.intro-img {
    height: 771px;
    width: 578px;

    top: -180px;
    left: -90px;
}
</style>