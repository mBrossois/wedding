<template>
    <div class="flex flex-column gap-1_5">
        <TitleDynamic :title="$t(title)" heading="h3" />
        <img class="img" :style="styles" loading="lazy" :src="img.src" :alt="img.alt" :height="img.height" :width="img.width" />
        <div>
            <slot />
        </div>
        <AppSpan v-if="distance" :text="$t(distance)" />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string,
    img: {
        src: string,
        alt: string,
        height: number,
        width: number,
        heightTablet: number,
        heightMobile: number,
    }
    distance?: string
}>()

const styles = computed(() => {
    return {
        '--height-tablet': props.img.heightTablet + 'px',
        '--height-mobile': props.img.heightMobile + 'px'
    }
})
</script>

<style scoped>
.img {
    width: 326px;
    height: var(--height-mobile);
    border-radius: 50px;
}
</style>