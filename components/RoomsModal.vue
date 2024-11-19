<template>
    <div class="middle-section">
        <div class="flex flex-column gap-1">
            <InputBlock class="input" id="title" label="Room title" inputType="text" placeholder="Comfort room" :value="name" @input="emitValue($event, 'name')"/>
            <InputBlock class="input" id="amount_people" label="Amount of people" inputType="number" placeholder="3" :value="amountOfPeople.toString()" @input="emitValue($event, 'amountOfPeople')"/>
            <InputBlock v-if="!id" class="input" id="create_amount" label="Create times" inputType="number" placeholder="20" :value="timesCreate?.toString() ?? '1'" @input="emitValue($event, 'timesCreate')"/>
            <div v-if="id">
                <AppParagraph v-if="id" text="Booked by" size="large" />
                <AppParagraph v-if="id" :text="bookedBy?.toString() ?? 'No one'" />
            </div>
            
            <div v-if="id">
                <AppParagraph v-if="id" text="Free for guests" size="large" />
                <AppParagraph v-if="id" :text="free ? 'yes' : 'no'" />
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    name: string,
    amountOfPeople: number,
    id?: number,
    timesCreate?: number,
    free?: boolean,
    bookedBy?: number
}>()

const emits = defineEmits<{
    (e: 'updateRooms', type: string, value: string): void
}>()

function emitValue(value: string, type: string) {
    emits('updateRooms', type, value)
}
</script>