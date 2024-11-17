<template>
    <div class="flex flex-column gap-1">
        <label class="kurale-regular font-16">{{ label }}</label>
        <select class="select rounded-medium p-1" @change="emitChange">
            <option v-for="option of options" :key="option.value" :value=option.value :selected="option.isActive">{{option.title}}</option>
        </select>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    label: string,
    options: Array<{
        value: string|number
        title: string,
        isActive: boolean
    }>
}>()

const emits = defineEmits<{
    (e: 'onChange', value: number): void
}>()

function emitChange(event: any) {
    emits('onChange', Number(event.target?.value))
}
</script>

<style scoped>
.select {
    background-color: transparent;
    color: var(--gray-lightest);
    border: 1px solid var(--gray-lightest);
}
</style>