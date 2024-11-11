<template>
    <div class="toaster flex flex-column items-center gap-1">
        <div v-for="toast in getToaster" :key="toast.id" :class="toast.state" class="toast-container">
            <AppToast 
                :type="toast.toast.type"
                :message="toast.toast.message"
                />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useToasterStore } from '~/store/toaster';
import AppToast from './Toast.vue';

const toasterStore = useToasterStore()
const { getToaster } = storeToRefs(toasterStore)
</script>

<style scoped>
.toaster {
    width: var(--page-width);
    position: sticky;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    padding-bottom: 1rem;
}

.toaster .toast-container.appear {
    animation: slide-in ease-in-out 350ms forwards;
}

.toaster .toast-container.disappear {
    animation: slide-out ease-in-out 350ms forwards;
}

@keyframes slide-in {
    0% {
        transform: translateY(105vh);
    } 100% {
        transform: translateY(0);
    }
}

@keyframes slide-out {
    0% {
        transform: translateY(0);
    } 100% {
        transform: translateY(105vh);
    }
}
</style>