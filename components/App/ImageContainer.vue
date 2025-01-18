<template>
    <div :class="columns" class="img-block flex flex-centered">
        <div class="img-container relative">
            <img class="img absolute" loading="lazy" :src="imgSrc" :height="img.height" :width="img.width" :alt="img.alt"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Img } from '~/types/image'

const props = defineProps<{img: Img, columns: 'split' | 'full'}>()
const images = import.meta.glob('@/assets/img/*.jpg', { eager: true })

const imgSrc = (images[props.img.src] as {default: string, type: string}).default
</script>

<style scoped>
.img-block {
    width: 316px;
    height: 200px;
}
.img-container {
    width: 100%;
    height: 200px;

    border-radius: 50px;
    border: 1px solid var(--gray-medium);

    overflow: hidden;
}

@media screen and (min-width: 768px) {
    .img-block.full {
        width: 704px;
        height: 500px;
    }

    .img-block.split {
        width: 344px;
    }

    .img-block.full .img-container {
        height: 500px;
    }
}


@media screen and (min-width: 1024px){
    .img-block.full {
        width: 992px;
    }

    .img-block.split {
        width: 325px;
    }
}
</style>