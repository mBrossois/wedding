<template>
    <div class="middle-section">
        <div class="flex flex-column gap-1">
            <InputBlock class="input" id="title" label="Room title" inputType="text" placeholder="Comfort room" :value="name" @input="emitValue($event, 'name')"/>
            <InputBlock class="input" id="amount_people" label="Amount of people" inputType="number" placeholder="3" :value="amountOfPeople.toString()" @input="emitValue($event, 'amountOfPeople')"/>
            <InputBlock class="input" id="create_amount" label="Create times" inputType="number" placeholder="20" :value="timesCreate?.toString() ?? '1'" @input="emitValue($event, 'timesCreate')"/>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    name: string,
    amountOfPeople: number,
    timesCreate?: number,
    free?: boolean,
    bookedBy?: number | null
}>()

const emits = defineEmits<{
    (e: 'updateRooms', type: string, value: string): void
}>()

function emitValue(value: string, type: string) {
    emits('updateRooms', type, value)
}
</script>