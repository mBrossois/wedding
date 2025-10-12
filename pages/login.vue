<template>
    <div class="flex flex-column items-center gap-1">
        <AuthSection :page="page === 'account-creation' ? 'create' : 'login'" :title="title" :status="status" @submit="submit" />
    </div>
</template>

<script setup lang="ts">
import { useToasterStore } from '~/store/toaster';
import { useUsersStore } from '~/store/users';
const { locale } = useI18n()

const page = useRoute().query.type

const title = {
    title: page === 'account-creation' ? 'CREATE_ACCOUNT' : 'LOGIN',
    heading: 'h1'
}

const toastStore = useToasterStore()
const store = useUsersStore()

const status: Ref<'success' | 'loading' > = ref('success')
async function submit(email: string) {
    status.value = 'loading'
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
                    emailRedirectTo: `${runtimeConfig.public.url}/${locale.value}${response === 'Login' ? '' : '/confirmation'}`
                }
            })
            
            if(data) {
                status.value = 'success'
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