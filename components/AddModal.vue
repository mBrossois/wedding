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
                        <InputBlock class="input" id="first-name" label="First name" inputType="text" placeholder="Emma"/>
                        <InputBlock class="input" id="last-name" label="Last name" inputType="text" placeholder="Bierdel"/>
                    </div>
                    <hr />
                    <TitleDynamic title="Under 12" heading="h2" />
                    <div v-for="child in children" :key="child" class="flex gap-1">
                        <InputBlock class="input" id="first-name" label="First name" inputType="text" placeholder="Mark"/>
                        <InputBlock class="input" id="last-name" label="Last name" inputType="text" placeholder="de Neut Brossois"/>
                    </div>
                    <hr />
                </div>
            </div>
            <div class="bottom-section">
                <div class="amounts flex gap-1 mt-2 justify-between">
                    <AppSelect label="Adults" :options="amounts" @onChange="updateAdults"/>
                    <AppSelect label="Under 12" :options="amounts" @onChange="updateChildren"/>
                    <AppSelect label="Rooms" :options="amounts" @onChange="updateRooms" />
                </div>
                <div class="buttons flex justify-between gap-1 mt-2">
                    <AppButton text="Save & close" isDark/>
                    <AppButton text="Save & add another" isDark />
                </div>
            </div>
        </div>
        <div class="overlay" @click="closeModal"></div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    isOpen: boolean
}>()
const emits = defineEmits<{
    (e: 'onClose'): void
}>()

function closeModal() {
    emits('onClose')
}

const amounts: Array<number> = []

for(let i = 0; i <= 5; i++) {
    amounts.push(i) 
}

const adults = ref(0)
function updateAdults(value: number) {
    adults.value = value
}

const children = ref(0)
function updateChildren(value: number) {
    children.value = value
}

let rooms = 0
function updateRooms(value: number) {
    rooms = value
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
    height: 450px;
}
</style>