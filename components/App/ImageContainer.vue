<template>
    <div :class="columns" class="img-block flex flex-centered">
        <div class="img-container flex justify-center items-center relative">
            <NuxtImg class="img absolute" loading="lazy" provider="cloudinary" :src="img.src" :sizes="img.sizes" :alt="img.alt"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Img } from '~/types/image'

const props = defineProps<{img: Img, columns: 'split' | 'double' | 'full'}>()
</script>

<style scoped>
.img-block {
    height: 200px;
    width: 316px;
}
.img-container {
    width: 100%;
    height: 100%;

    border-radius: 50px;
    border: 1px solid var(--gray-medium);

    overflow: hidden;
}

@media screen and (min-width: 768px) {
    .img-block.full {
        height: 500px;
        width: 704px;
    }

    .img-block.split,
    .img-block.double {
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

    .img-block.double {
        height: 270px;
        width: 464px;
    }

    .img-block.split {
        width: 325px;
    }
}
</style>