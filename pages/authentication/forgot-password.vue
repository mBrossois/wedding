<template>
    <AuthSection page="passwordForgotten" :title="title" @submit="submit" />
</template>

<script setup lang="ts">
import AuthSection from '~/components/AuthSection.vue';

const supabase = useSupabaseClient()

const title = {
    title: 'Reset password',
    heading: 'h1'
}

async function submit(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    if(!error) {
        navigateTo('/authentication/confirmation')
    } 
}


</script>