<template>
    <div>
        <div class="img-section">
            <ImageAltar :img="img"/>
        </div>
        <div class="input-section flex flex-centered">
            <InputBlock label="Fill in the code  found in the letter" input-type="number" placeholder="2102912823" @input="setLetterkeyValue" />
        </div>
        <div class="button-section flex flex-centered">
            <Button text="Enter" @click="onLetterEntered"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '~/store/users';

const img = {
    src: '/assets/img/PXL_20230610_230519215.jpg',
    alt: 'Emma & Mark in NY'
}

const lettercode = ref('');

function setLetterkeyValue(value: string) {
    lettercode.value = value;
}

const store = useUsersStore()
const { getLettercode } = storeToRefs(store)
function onLetterEntered() {
    store.setLettercode(lettercode.value)
}
</script>

<style scoped>
.img-section,
.input-section {
    margin-top: 32px;
}

.button-section {
    margin-top: 16px;
}
</style>