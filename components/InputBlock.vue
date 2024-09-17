<template>
    <div class="input-container">
        <label class="kurale-regular font-20">{{ label }}</label>
        <input v-model="inputValue" class="input-field rounded-medium kurale-regular font-20" :id="id" :autocomplete="autocomplete" :type="inputType" :placeholder="placeholder" @input="onInput"/>
        <ErrorLabel class="mt-0_5" :error="error" />
    </div>
</template>

<script setup lang="ts">
import type { Input } from '~/types/input';

defineProps<Input>()
const emits = defineEmits<{
  (e: 'input', value: string): void
}>()

const inputValue = ref()
function onInput() {
    emits('input', inputValue.value)
}
</script>

<style scoped>
.input-container {
    width: min-content;
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