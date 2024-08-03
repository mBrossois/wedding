<template>
    <div class="flex flex-column items-center gap-1">
        <AuthSection page="login" :title="title" @submit="submit" />
        <div class="bottom-section flex flex-column items-center">
            <ErrorLabel :error="errorMessage" />
        </div>
    </div>
</template>

<script setup lang="ts">
import AuthSection from '~/components/AuthSection.vue';

const title = {
    title: 'Login',
    heading: 'h1'
}

const errorMessage = ref()
async function submit(email: string, password: string) {
    const supabase = useSupabaseClient()

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if(error) {
        errorMessage.value = 'Could not log you in'
    } else {
        navigateTo('/')
    }
}
</script>

<style scoped>
.bottom-section {
    width: var(--width-mobile);
}
</style>