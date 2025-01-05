<template>
    <textarea v-model="textareaValue" :placeholder="placeholder" class="textarea" @input="emitInput" />
</template>

<script setup lang="ts">
const props = defineProps<{
    value: string,
    placeholder: string,
}>()

const emits = defineEmits<{
    (e: 'input', value: string): void
}>()

const textareaValue = ref(props.value)

function emitInput() {
    emits('input', textareaValue.value)
}
</script>

<style scoped>
.textarea {
    width: 316px;
    height: 76px;
    padding: 1rem;

    background-color: transparent;
    border: 1px solid var(--gray-darkest);
    border-radius: 15px;
    
    resize: none;
}
</style>