<template>
    <div :class="variant" class="input-container">
        <label class="kurale-regular font-20">{{ label }}</label>
        <input v-model="inputValue" :value="value" class="input-field rounded-medium kurale-regular font-20" :id="id" :autocomplete="autocomplete" :type="inputType" :placeholder="placeholder" @input="onInput" @keypress.enter="onEnter"/>
        <ErrorLabel class="mt-0_5" :error="error" />
    </div>
</template>

<script setup lang="ts">
import type { Input } from '~/types/input';

const props = defineProps<Input>()
const emits = defineEmits<{
  (e: 'input', value: string): void
  (e: 'enter'): void
}>()

const inputValue = ref(props.value)
function onInput() {
    emits('input', inputValue.value as string)
}

function onEnter() {
  emits('enter')
}
</script>

<style scoped>
.input-container {
    width: min-content;
}

.input-container.secondary .input-field{
  width: 94px;
  border-color: transparent;
}

.input-container.secondary:hover .input-field,
.input-container.secondary .input-field:focus-visible{
  border-color: var(--gray-darkest);
  outline: none;
}

.input-field {
    width: 316px;
    height: 47px;

    background-color: transparent;
    border: 1px solid var(--gray-darkest);

    margin-top  : 10px;
    padding: 0 10px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  appearance: textfield;
}
</style>