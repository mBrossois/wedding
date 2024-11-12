<template>
    <div class="flex flex-column items-center gap-1">
        <AuthSection page="login" :title="title" @submit="submit" />
        <div class="bottom-section flex flex-column items-center">
            <ErrorLabel :error="errorMessage" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useToasterStore } from '~/store/toaster';
import { useUsersStore } from '~/store/users';
const { locale } = useI18n()

const title = {
    title: 'Login',
    heading: 'h1'
}

const toastStore = useToasterStore()
const store = useUsersStore()

const errorMessage = ref()
async function submit(email: string) {
    try {
        const response = await $fetch(`/api/login`, { 
            method: 'GET',
            query: {
                letterCode: store.getLettercode,
                email
            }
        })

        if(response !== 'Something went wrong') {
            const runtimeConfig = useRuntimeConfig()
            const supabase = useSupabaseClient()

            const { data, error } = await supabase.auth.signInWithOtp({
                email: email as string,
                options: {
                    emailRedirectTo: `${runtimeConfig.public.url}/${locale.value}/confirmation${response === 'Login' ? '?page=logged-in' : ''}`
                }
            })
            
            if(data) {
                const localePath = useLocalePath()
                navigateTo({
                    path: localePath('/confirmation'),
                    query: {
                        page: response === 'New user' ? 'activation-link' : 'login'
                    }
                })
            }
            
        }

    } catch(e) {
        toastStore.addToast({type: 'error', message: 'Could not log you in'})
    }
}
</script>

<style scoped>
.bottom-section {
    width: var(--page-width);
}
</style>