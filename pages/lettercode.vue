<template>
    <div>
        <div class="img-section">
            <ImageAltar :img="img"/>
        </div>
        <div class="input-section">
            <div class="flex flex-centered">
                <InputBlock label="Fill in the code found in the letter" input-type="text" placeholder="2102912823" :error="error" @input="setLetterkeyValue" />
            </div>
        </div>
        <div class="button-section flex flex-centered">
            <AppButton text="Enter" @click="onLetterEntered"/>
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
    if(error) {
        error.value = undefined
    }
}

const store = useUsersStore()
const error = ref()
async function onLetterEntered() {
    if(lettercode.value) {
        try {
            const response = await $fetch(`/api/lettercode/${lettercode.value}`, { 
                method: 'GET'
            })

            if(response === 'create_account') {
                store.setLettercode(lettercode.value)
                await navigateTo('/authentication/create-account')
            } else if(response === 'login') {
                await navigateTo('/authentication/login')
            } else {
                error.value = response;
            }
        } catch(e) {
            error.value = 'Could not find the code'
        }
        
    } else {
        error.value = 'You need to fill something in!'
    }
    
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