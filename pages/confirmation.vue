<template>
    <div class="confirmation flex justify-center mt-2">
        <div class="page-width flex flex-column gap-1 ">
            <TitleDynamic :title="title.title" :heading="title.heading" />
            <AppParagraph :text="text" />
            <div class="m-auto">
                <AppButton :text="button.text" :to="localePath(button.to)"/>
            </div>
        </div>
            
    </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const page = useRoute().query.page

const textItems: {[key: string]: string} = {
    'activation-link': 'We send and email to confirm your account.',
    'login': 'We send an email with a login link.',
    'logged-in': 'We have succesfully logged you in!.'
}

const text = !page ? 'Succesfully activated your account.' : textItems[page as string]

const title = {
    title: page === 'login' ? 'Email send' : 'Confirmed',
    heading: 'h1'
}

const button = {
    text: page === 'logged-in' ? 'Go to home' : 'Go to login',
    to: page === 'logged-in' ? '/' : '/login'
}
</script>