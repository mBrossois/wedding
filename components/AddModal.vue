<template>
    <div v-show="isOpen">
        <div class="guest-modal p-1 rounded-medium">
            <div class="justify-between mb-1">
                <TitleDynamic title="Guest" heading="h1" />
                <img class="clickable" src="~/assets/img/close.svg" alt="X" @click="closeModal" />
            </div>
            <div class="middle-section">
                <div class="flex flex-column gap-1">
                    <TitleDynamic title="Adults" heading="h2" />
                    <div v-for="adult in adults" :key="adult" class="flex gap-1">
                        <InputBlock class="input" id="first-name" label="First name" inputType="text" placeholder="Emma" @input="setName($event, 'adults', 'firstName', adult - 1)"/>
                        <InputBlock class="input" id="last-name" label="Last name" inputType="text" placeholder="Bierdel" @input="setName($event, 'adults', 'lastName', adult - 1)"/>
                    </div>
                    <hr />
                    <TitleDynamic title="Under 12" heading="h2" />
                    <div v-for="child in children" :key="child" class="flex gap-1">
                        <InputBlock class="input" id="first-name" label="First name" inputType="text" placeholder="Mark" @input="setName($event, 'children', 'firstName', child - 1)"/>
                        <InputBlock class="input" id="last-name" label="Last name" inputType="text" placeholder="de Neut Brossois" @input="setName($event, 'children', 'lastName', child - 1)"/>
                    </div>
                    <hr />
                </div>
            </div>
            <div class="bottom-section">
                <div class="amounts flex gap-1 mt-2 justify-between">
                    <AppSelect ref="selectAdult" label="Adults" :options="amounts" @onChange="updateAdults"/>
                    <AppSelect ref="selectChild" label="Under 12" :options="amounts" @onChange="updateChildren"/>
                    <AppSelect ref="selectRoom" label="Rooms" :options="amounts" @onChange="updateRooms" />
                </div>
                <div class="buttons flex justify-between gap-1 mt-2">
                    <AppButton text="Save & close" isDark @click="saveAndClose"/>
                    <AppButton text="Save & add another" isDark @click="saveAndAnother"/>
                </div>
            </div>
        </div>
        <div class="overlay" @click="closeModal"></div>
    </div>
</template>

<script setup lang="ts">
import { useToasterStore } from '~/store/toaster';

defineProps<{
    isOpen: boolean
}>()
const emits = defineEmits<{
    (e: 'onClose'): void
}>()

const selectChild = ref()
const selectAdult = ref()
const selectRoom = ref()

function closeModal() {
    emits('onClose')
    resetFields()
}

function resetFields () {
    form.adults = []
    form.children = []
    form.rooms = []
    adults.value = 0
    children.value = 0
    rooms = 0
    selectAdult.value.resetValue()
    selectChild.value.resetValue()
    selectRoom.value.resetValue()
}

const amounts: Array<number> = []

for(let i = 0; i <= 5; i++) {
    amounts.push(i) 
}

const form: {adults: Array<object>, children: Array<object>, rooms: Array<number>} = {
    adults: [],
    children: [],
    rooms: []
}

function setName(value: string, lifeHood: string, type: string, id: number) {
    form[lifeHood][id][type] = value;
}

const adults = ref(0)
function updateAdults(value: number) {
    adults.value = value
    if(value > form.adults.length) {
        const endLoop = (value - form.adults.length - 1)
        for(let i = 0; i <= endLoop; i++ ) {
            form.adults.push({firstName: '', lastName: ''})
        }
    }
    if(value < form.adults.length) {
        form.adults.splice(value)
    }
}

const children = ref(0)
function updateChildren(value: number) {
    children.value = value
    if(value > form.children.length) {
        const endLoop = (value - form.children.length - 1)
        for(let i = 0; i <= endLoop; i++ ) {
            form.children.push({firstName: '', lastName: ''})
        }
    }
    if(value < form.children.length) {
        form.children.splice(value)
    }
}

let rooms = 0
function updateRooms(value: number) {
    rooms = value
}

const toasterStore = useToasterStore()

async function saveGuests() {
    const supabase = useSupabaseClient()
    const result = await $fetch('/api/guests', {
        method: 'post',
        body: {
            adults: adults.value,
            children: children.value,
            rooms,
            form
        },
        headers: useRequestHeaders(['cookie'])
    })

    if(result === 'Added guests') {
        toasterStore.addToast({type: 'success', message: `We successfully added ${form.adults[0].firstName}`})
        return 'success'
    }
}

function saveAndAnother() {
    saveGuests()
    resetFields()
}

async function saveAndClose() {
    saveGuests()
    closeModal()
}
</script>

<style>
.guest-modal {
    position: fixed;
    height: calc(100vh - 2rem);
    width: var(--page-width);
    top: 1rem;
    bottom: 1rem;
    z-index: 2000;
    background-color: var(--gray-darkest);
    color: var(--gray-lightest)
}

.overlay {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    cursor: pointer;
}

.clickable {
    cursor: pointer;
}

.input.input-container label,
.input.input-container .input-field {
    font-size: 16px;
} 

.input.input-container, 
.input.input-container .input-field {
    width: 100%;
}

.input.input-container .input-field {
    color: white;
    border: 1px solid;
}

.bottom-section {
    background-color: var(--gray-darkest);
    width: calc(var(--page-width) - 2rem);
}

.middle-section {
    overflow-y: auto;
    height: 400px;
}
</style>