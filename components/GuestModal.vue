<template>
    <div class="middle-section">
        <div class="flex flex-column gap-1">
            <TitleDynamic title="Adults" heading="h2" />
            <div v-for="(adult, index) in form.adults" :key="index" class="flex gap-1">
                <InputBlock class="input" id="first-name" label="First name" inputType="text" placeholder="Emma" :value="adult.firstName" @input="setName($event, 'adults', 'firstName', index)"/>
                <InputBlock class="input" id="last-name" label="Last name" inputType="text" placeholder="Bierdel" :value="adult.lastName" @input="setName($event, 'adults', 'lastName', index)"/>
            </div>
            <hr />
            <TitleDynamic title="Under 12" heading="h2" />
            <div v-for="(child, index) in form.children" :key="index" class="flex gap-1">
                <InputBlock class="input" id="first-name" label="First name" inputType="text" placeholder="Mark" :value="child.firstName" @input="setName($event, 'children', 'firstName', index)"/>
                <InputBlock class="input" id="last-name" label="Last name" inputType="text" placeholder="de Neut Brossois" :value="child.lastName" @input="setName($event, 'children', 'lastName', index)"/>
            </div>
            <hr />
        </div>
    </div>
    <div class="bottom-section">
        <div class="amounts flex gap-1 mt-2 justify-between">
            <AppSelect label="Adults" :options="amounts.adults" @onChange="updateAdults"/>
            <AppSelect label="Under 12" :options="amounts.children" @onChange="updateChildren"/>
            <AppSelect label="Rooms" :options="amounts.rooms" @onChange="updateRooms" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useToasterStore } from '~/store/toaster';
import type { Guest, selectAmounts } from '~/types/guests';

const props = defineProps<{
    form: {adults: Array<Guest>, children: Array<Guest>, rooms: Array<number>},
    amounts: {
        adults: selectAmounts
        children: selectAmounts
        rooms: selectAmounts
    }
}>()

const emits = defineEmits<{
    (e: 'updateAmounts', lifeHood: string, value: selectAmounts): void
    (e: 'updateForm', lifeHood: string, form: Array<Guest>): void
}>()

function setName(value: string, lifeHood: string, type: string, id: number) {
    const nameForm = [...props.form[lifeHood]]
    nameForm[id][type] = value;
    emits('updateForm', lifeHood, nameForm)
}
const toasterStore = useToasterStore()
function updateAdults(value: number) {
    toasterStore.addToast({type: 'success', message: 'New amount value'})

    const adultAmounts = [...props.amounts.adults]
    adultAmounts.find(amount => amount.isActive === true)!.isActive = false
    adultAmounts[value].isActive = true

    emits('updateAmounts', 'adults', adultAmounts)

    let adults = [...props.form.adults]
    if(value > props.form.adults.length) {
        const endLoop = (value - props.form.adults.length - 1)
        for(let i = 0; i <= endLoop; i++ ) {
            adults.push({firstName: '', lastName: ''})
        }
    }
    if(value < props.form.adults.length) {
        adults.splice(value)
    }

    emits('updateForm', 'adults', adults)
}

function updateChildren(value: number) {
    const childrenAmounts = [...props.amounts.children]
    childrenAmounts.find(amount => amount.isActive === true)!.isActive = false
    childrenAmounts[value].isActive = true

    emits('updateAmounts', 'children', childrenAmounts)
    
    let children = [...props.form.children]
    if(value > props.form.children.length) {
        const endLoop = (value - props.form.children.length - 1)
        for(let i = 0; i <= endLoop; i++ ) {
            children.push({firstName: '', lastName: ''})
        }
    }
    if(value < props.form.children.length) {
        children.splice(value)
    }

    emits('updateForm', 'children', children)
}

function updateRooms(value: number) {
    const roomAmounts = [...props.amounts.rooms]
    roomAmounts.find(amount => amount.isActive === true)!.isActive = false
    roomAmounts[value].isActive = true
    
    emits('updateAmounts', 'rooms', roomAmounts)
}
</script>