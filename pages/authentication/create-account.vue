<template>
    <AuthSection page="create" :title="title" @submit="submit" />
</template>

<script setup lang="ts">
import AuthSection from '~/components/AuthSection.vue';
import { useUsersStore } from '~/store/users';

const userStore = useUsersStore()

const title = {
    title: 'Create your account',
    heading: 'h1'
}

async function submit(email: string, password: string) {
    const supabase = useSupabaseClient()
    const lettercode = userStore.getLettercode
    try {
        const response = await $fetch(`/api/lettercode/${lettercode}`, { 
            method: 'GET'
        })

        // Have to set up https://resend.com with domain on netlify
        if(response === 'create_account') {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password
              })
              if (error) console.log(error)
        }
    } catch(e) {
        console.log(e)
    }
}
</script>