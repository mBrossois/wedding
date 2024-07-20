<template>
    <button class="btn kurale-regular font-20" @click="onClick">{{ text }}</button>
</template>

<script setup lang="ts">
defineProps<{text: string}>()
const emits = defineEmits<{
  (e: 'click'): void
}>()

function onClick() {
    emits('click')
}
</script>

<style scoped>
.btn {
    border: none;
    background-color: var(--gray-darkest);
    color: white;

    padding: 16px 24px;
    border-radius: 10px;

    cursor: pointer;
    text-transform: capitalize;
    -webkit-box-shadow: 1px 2px 5px 0px #0000003b;
    box-shadow: 1px 2px 5px 0px #0000003b;

    transition: all 300ms ease-in-out;
}

.btn:hover {
    padding: 20px 28px;
}
</style>