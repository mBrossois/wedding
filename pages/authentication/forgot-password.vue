<template>
    <AuthSection page="passwordForgotten" :title="title" @submit="submit" />
</template>

<script setup lang="ts">
import AuthSection from '~/components/AuthSection.vue';
import { useToasterStore } from '~/store/toaster';
import { useUsersStore } from '~/store/users';

const supabase = useSupabaseClient()

const title = {
    title: 'Forgot password',
    heading: 'h1'
}

const userStore = useUsersStore()
const toastStore = useToasterStore()
async function submit(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    if(!error) {
        userStore.setConfirmation('forgotten')
        navigateTo('/authentication/confirmation')
    } else {
        toastStore.addToast({type: 'error', message: 'Could not send reset email'})
    }
}


</script>