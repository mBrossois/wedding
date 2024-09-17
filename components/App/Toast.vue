<template>
    <div :class="type" class="toast">
        <AppParagraph class="title" :text="title" size="large" />
        <AppParagraph :text="message"  />
    </div>
</template>

<script setup lang="ts">
import type { Toast } from '~/types/toast.js';

const props = defineProps<Toast>()

const typeTitels = {
    error: 'Error',
    info: 'Info'
}

const title = typeTitels[props.type]
</script>

<style scoped>
.toast {
    padding: 8px 32px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;

    max-width: var(--page-width);

    color: var(--gray-light);
}

.toast .title {
    margin-bottom: 4px;
}

.error {
    border-left: 8px solid var(--error);
    background-color: var(--error-background);
}
</style>