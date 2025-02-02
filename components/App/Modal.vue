<template>
    <div v-show="isOpen">
        <div :class="{'small': size === 'small'}" class="modal flex flex-column p-1 rounded-medium">
            <div class="justify-between mb-1">
                <TitleDynamic :title="title" heading="h1" />
                <img class="clickable" src="~/assets/img/close.svg" alt="X" @click="closeModal" />
            </div>
            <slot></slot>
            <div class="buttons flex justify-between gap-1 mt-2">
                <AppButton v-for="button of buttons" :text="button.title" isDark @click="emitClick(button.action)"/>
            </div>
        </div>
        <div class="overlay" @click="closeModal"></div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    isOpen: boolean
    title: string
    size: 'small' | 'full'
    buttons: Array<{title: string, action: string}>
}>()

const emits = defineEmits<{
    (e: 'onClose'): void
    (e: 'btnClick', action: string): void
}>()

function closeModal() {
    emits('onClose')
}

function emitClick(action: string) {
    emits('btnClick', action)
}

</script>

<style>
.modal {
    position: fixed;
    height: calc(100svh - 2rem);
    width: calc(var(--page-width) - 2rem);
    top: 1rem;
    bottom: 1rem;
    z-index: 1000;
    background-color: var(--gray-darkest);
    color: var(--gray-lightest)
}

.modal.small {
    height: 16rem;
}

.overlay {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    cursor: pointer;
}

.clickable {
    cursor: pointer;
}

.input.input-container label,
.input.input-container .input-field {
    font-size: 16px;
} 

.input.input-container, 
.input.input-container .input-field {
    width: 100%;
}

.input.input-container .input-field {
    color: white;
    border: 1px solid;
}

.bottom-section {
    background-color: var(--gray-darkest);
    width: calc(var(--page-width) - 4rem);
}

.middle-section {
    overflow-y: auto;
    flex: 1;
}
</style>