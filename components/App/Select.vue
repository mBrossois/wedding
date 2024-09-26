<template>
    <div class="flex flex-column gap-1">
        <label class="kurale-regular font-16">{{ label }}</label>
        <select v-model="selectValue" class="select rounded-medium p-1" @change="emitChange">
            <option v-for="option in options" :key="option" :value=option>{{option}}</option>
        </select>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    label: string,
    options: Array<string|number>
}>()

const emits = defineEmits<{
    (e: 'onChange', value: number): void
}>()

const selectValue = ref('0')

function emitChange() {
    emits('onChange', Number(selectValue.value))
}
</script>

<style scoped>
.select {
    background-color: transparent;
    color: var(--gray-lightest);
    border: 1px solid var(--gray-lightest);
}
</style>