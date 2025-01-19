<template>
    <div class="flex flex-column gap-1_5">
        <TitleDynamic :title="$t(title)" heading="h3" />
        <AppImageContainer :img="img" columns="double" />
        <div>
            <slot />
        </div>
        <AppSpan v-if="distance" :text="$t(distance)" />
    </div>
</template>

<script setup lang="ts">
import type { Img } from '~/types/image';

const props = defineProps<{
    title: string,
    img: Img
    distance?: string
}>()
</script>