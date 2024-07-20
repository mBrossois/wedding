<template>
    <div class="input-container">
        <label class="kurale-regular font-20">{{ label }}</label>
        <input v-model="inputValue" class="input-field kurale-regular font-20" :type="inputType" :placeholder="placeholder" @input="onInput"/>
    </div>
</template>

<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';
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

    background-color: var(--gray-lightest);
    -webkit-box-shadow: 1px 2px 5px 0px #0000003b;
    box-shadow: 1px 2px 5px 0px #0000003b;
    border: none;

    margin-top  : 10px;
    padding: 0 10px;
    border-radius: 10px;
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