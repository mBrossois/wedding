<template>
    <div>
        <div class="img-section">
            <ImageAltar/>
        </div>
        <div class="input-section">
            <div class="flex flex-centered">
                <InputBlock id="lettercode" :label="$t('FILL_LETTERCODE')" input-type="text" placeholder="2102912823" :error="error" @input="setLetterkeyValue" />
            </div>
        </div>
        <div class="button-section flex flex-centered">
            <AppButton :text="$t('CONTINUE')" @click="onLetterEntered"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '~/store/users';

const lettercode = ref('');

function setLetterkeyValue(value: string) {
    lettercode.value = value;
    if(error) {
        error.value = undefined
    }
}
const store = useUsersStore()
const error = ref()
function onLetterEntered() {
    if(lettercode.value) {
        store.setLettercode(lettercode.value)
        const localePath = useLocalePath()
        navigateTo(localePath({path: '/login', query: {type: 'account-creation'}}))
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