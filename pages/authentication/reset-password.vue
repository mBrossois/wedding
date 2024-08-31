<template>
    <div class="flex justify-center mt-2">
        <div class="flex flex-column gap-2">
            <TitleDynamic :title="title.title" :heading="title.heading" />
            <div class="flex flex-column items-center gap-1">
                <InputBlock label="New password" input-type="password" placeholder="*****" @input="setNewPassword" />
                <InputBlock label="New Password again" input-type="password" placeholder="*****" @input="setNewPasswordSecond" />
                <ErrorLabel :error="error" />
                <AppButton text="Reset password" @click="onSubmit"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ErrorLabel from '~/components/ErrorLabel.vue';
import { useToasterStore } from '~/store/toaster';

// const supabase = useSupabaseClient()
const toastStore = useToasterStore()

const title = {
    title: 'Reset password',
    heading: 'h1'
}

const password = {
    new: '',
    newSecond: ''
}

function setNewPassword(value: string) {
    password.new = value
}

function setNewPasswordSecond(value: string) {
    password.newSecond = value
}

const error = ref()

function validateFields() {
    let hasError = false
    error.value = null

    if(password.new.length <= 6 || password.newSecond.length <= 6) {
        error.value = 'The password should be at least 6 characters long!'
        hasError = true
    } else if(password.new !== password.newSecond) {
        error.value = 'The passwords should be equal!'
        hasError = true
    }

    return !hasError
}

async function onSubmit() {
    if(validateFields()) {
        // const { error } = await supabase.auth.updateUser({
        //     password: password.new
        // })
        // if(!error) {
        //     navigateTo({
        //     path: '/authentication/confirmation',
        //     query: { page: 'password-reset'}
        // })
        // } else {
        //     toastStore.addToast({type: 'error', message: 'Could not reset your password'})
        // }
        
    }
}
</script>