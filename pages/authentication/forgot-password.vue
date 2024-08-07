<template>
    <AuthSection page="passwordForgotten" :title="title" @submit="submit" />
</template>

<script setup lang="ts">
import AuthSection from '~/components/AuthSection.vue';
import { useToasterStore } from '~/store/toaster';

const supabase = useSupabaseClient()
const runtimeConfig = useRuntimeConfig()

const title = {
    title: 'Forgot password',
    heading: 'h1'
}

const toastStore = useToasterStore()
async function submit(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(
        email,
        { redirectTo: runtimeConfig.public.url + '/authentication/reset-password'}
    )
    if(!error) {
        navigateTo({path: '/authentication/confirmation',
        query: {
            page: 'reset-link',
        }}
        )
    } else {
        toastStore.addToast({type: 'error', message: 'Could not send reset email'})
    }
}


</script>