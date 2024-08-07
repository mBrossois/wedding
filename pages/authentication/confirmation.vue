<template>
    <div class="confirmation flex justify-center mt-2">
        <div class="page-width flex flex-column gap-1 ">
            <TitleDynamic :title="title.title" :heading="title.heading" />
            <AppParagraph :text="text" />
            <div class="m-auto">
                <AppButton text="Go to login" to="/authentication/login"/>
            </div>
        </div>
            
    </div>
</template>

<script setup lang="ts">
const page = useRoute().query.page

const textItems: {[key: string]: string} = {
    'activation-link': 'We send and email to confirm your account.',
    'reset-link': 'We send an email with a reset link.',
    'password-reset': 'We have reset your password.'
}

const text = !page ? 'Succesfully activated your account.' : textItems[page as string]

const title = {
    title: 'Confirmed',
    heading: 'h1'
}
</script>