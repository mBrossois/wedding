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
            <TitleDynamic title="Rooms" heading="h2" />
            <div class="flex flex-column gap-2">
                <div v-for="(room, index) in form.rooms" :key="index" class="flex flex-column gap-1">
                    <AppSelect  label="room" :options="showRooms(index)" @onChange="setRoom($event, index)"/>
                    <AppRadioBtn class="mt-0_5" isLight name="ChildBed" label="Add child bed" value="addChildBed" :checked="room.childBed || false" @onclick="updateChildBed(index)"></AppRadioBtn>
                </div>
            </div>
            <hr />
        </div>
    </div>
    <div class="bottom-section">
        <div class="flex justify-between">
            <AppRadioBtn class="mt-0_5" isLight name="Free room" label="Get free room" value="isFreeRoom" :checked="form.isFreeRoom || false" @onclick="updateFreeRoom"></AppRadioBtn>
            <AppRadioBtn class="mt-0_5" isLight name="Coming" label="Coming" value="coming" :checked="form.isComing || false" @onclick="updateComing"></AppRadioBtn>
        </div>
        <div class="amounts mt-0_5 flex gap-1 justify-between">
            <AppSelect label="Adults" :options="amounts.adults" @onChange="updateAdults"/>
            <AppSelect label="Under 12" :options="amounts.children" @onChange="updateChildren"/>
            <AppSelect label="Rooms" :options="amounts.rooms" @onChange="updateRooms" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Guest, GuestRoom, selectAmounts } from '~/types/guests';

const props = defineProps<{
    form: {adults: Array<Guest>, children: Array<Guest>, rooms: Array<GuestRoom>, isFreeRoom: boolean, isComing: boolean},
    amounts: {
        adults: selectAmounts
        children: selectAmounts
        rooms: selectAmounts
    }
    roomsAvailable: Array<{title: string, value: string|number, isActive: boolean}> 
    activeRoomName: Array<string>,
}>()

const emits = defineEmits<{
    (e: 'updateAmounts', lifeHood: string, value: selectAmounts): void
    (e: 'updateForm', lifeHood: string, form: Array<Guest | GuestRoom> | boolean): void
}>()

function updateFreeRoom() {
    emits('updateForm', 'isFreeRoom', !props.form.isFreeRoom)
}

function updateComing() {
    emits('updateForm', 'isComing', !props.form.isComing)
}

function updateChildBed(index: number) {
    const rooms = [...props.form.rooms]
    rooms[index].childBed = !rooms[index].childBed
    emits('updateForm', 'rooms', rooms)
}

function showRooms(index: number) {
    const rooms = props.roomsAvailable.filter(room => !(props.form.rooms.includes(room.value) && props.form.rooms[index] !== room.value) )
    rooms.unshift({title: 'None', value: -1, isActive: false})

    if(props.activeRoomName.length - 1 >= index) {
        rooms.unshift({title: props.activeRoomName[index], value: props.form.rooms[index].id, isActive: true, childBed: props.form.rooms[index].childBed})
    }
    return rooms
}

function setName(value: string, lifeHood: string, type: string, id: number) {
    const nameForm = [...props.form[lifeHood]]
    nameForm[id][type] = value;
    emits('updateForm', lifeHood, nameForm)
}


function setRoom(value: number, roomSelect: number) {
    const nameForm = [...props.form.rooms]
    nameForm[roomSelect] = {id: value, childBed: nameForm[roomSelect].childBed};
    emits('updateForm', 'rooms', nameForm)
}


function updateAdults(value: number) {
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

    let rooms = [...props.form.rooms]
    if(value > props.form.rooms.length) {
        const endLoop = (value - props.form.rooms.length - 1)
        for(let i = 0; i <= endLoop; i++ ) {
            rooms.push(-1)
        }
    }
    if(value < props.form.children.length) {
        rooms.splice(value)
    }

    emits('updateForm', 'rooms', rooms)
}
</script>