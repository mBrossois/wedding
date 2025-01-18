<template>
    <component :is="component" :disabled="disabled" :to="to" class="btn-container" :class="{dark: isDark}">
        <div class="btn-container__hover" @click="onClick"></div>
        <div class="btn-overlay horizontal" />
        <div class="btn-overlay vertical" />
        <AppParagraph :class="textClasses" :text=text size="big" class="btn rounded-medium kurale-regular" />
    </component>
</template>

<script setup lang="ts">

const props = defineProps<{
    text: string,
    to?: string,
    smallText?: boolean,
    isDark?: boolean,
    disabled?: boolean
}>()

const emits = defineEmits<{
  (e: 'click'): void
}>()

const component = props.to ? resolveComponent('NuxtLink') : 'button'

const textClasses = [
    `font-${props.smallText ? '16' : '20'}`
]

function onClick() {
    emits('click')
}
</script>

<style scoped>
.btn-container[disabled=""] .btn-container__hover {
    display: none;
}

.btn-container__hover {
    position: absolute;
    top: -10px;

    height: calc(100% + 20px);
    width: calc(100%);
    z-index: 100;
    cursor: pointer;
}

.btn-container.dark .btn {
    color: var(--gray-lightest);
    border: 1px solid var(--gray-lightest);
}

.btn-container.dark .btn-overlay,
.btn-container .btn-container__hover:hover ~ .btn-overlay {
    border-color: var(--gray-lightest);
}

.btn {
    background-color: transparent;
    color: var(--gray-darkest);
    border: 1px solid var(--gray-darkest);

    padding: 8px 24px;

    cursor: pointer;

    transition: all 300ms ease-in-out;
}

.btn::first-letter {
    text-transform: capitalize;
}

.btn-container.dark .btn-container__hover:hover ~ .btn {
    background-color: var(--gray-lightest);
    color: var(--gray-darkest);
}

.btn-container__hover:hover ~ .btn {
    transition: all 300ms ease-in-out 500ms;
    background-color: var(--gray-darkest);
    color: var(--gray-lightest);
}

.btn-container {
    display: block;
    width: fit-content;
    
    position: relative;
    margin: 10px 0;

    border: none;
    background-color: transparent;
    text-decoration: none;
}

.btn-overlay {
    position: absolute;
    height: calc(100% + 20px);
    width: calc(100% - 20px);
    border-radius: 10px;
    top: -10px;
    left: 10px;
    transition: height 500ms ease-in 300ms, width 500ms ease-in 300ms, border-radius 200ms ease-in 600ms, left 500ms ease-in 300ms, top 500ms ease-in 300ms, transform 500ms ease-in 300ms;
}

.btn-container__hover:hover ~ .btn-overlay {
    border-radius: 0;
    cursor: pointer;
    transition: height 500ms ease-in, width 500ms ease-in, border-radius 200ms ease-in, left 500ms ease-in, top 500ms ease-in, transform 500ms ease-in;
}
.btn-overlay.horizontal {
    border-top: 1px solid var(--gray-darkest);
    border-bottom: 1px solid var(--gray-darkest);
    transform: translateX(0);
}

.btn-overlay.vertical {
    border-left: 1px solid var(--gray-darkest);
    border-right: 1px solid var(--gray-darkest);
}

.btn-container__hover:hover ~ .btn-overlay.horizontal {
    border-top: 1px solid var(--gray-darkest);
    border-bottom: 1px solid var(--gray-darkest);
    width: 0;
    left: calc(50% - 5px);
}

.btn-container__hover:hover ~ .btn-overlay.vertical {
    border-left: 1px solid var(--gray-darkest);
    border-right: 1px solid var(--gray-darkest);
    height: 0;
    top: calc(50% - 5px);
}
</style>