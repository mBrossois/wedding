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
    info: 'Info',
    success: 'Success'
}

const title = typeTitels[props.type]
</script>

<style scoped>
.toast {
    padding: 8px 32px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;

    max-width: calc(var(--page-width) - 2rem);

    color: var(--gray-light);
}

.toast .title {
    margin-bottom: 4px;
}

.error {
    border-left: 8px solid var(--error);
    background-color: var(--error-background);
}

.success {
    border-left: 8px solid var(--success);
    background-color: var(--success-background);
}

.info {
    border-left: 8px solid var(--info);
    background-color: var(--info-background);
}
</style>