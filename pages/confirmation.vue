<template>
    <div class="confirmation flex justify-center mt-2">
        <div class="flex flex-column gap-1 ">
            <TitleDynamic :title="$t(title.title)" :heading="title.heading" />
            <AppParagraph :text="$t(text)" />
            <div class="m-auto">
                <AppButton :text="$t(button.text)" :to="localePath(button.to)"/>
            </div>
        </div>
            
    </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const page = useRoute().query.page

const textItems: {[key: string]: string} = {
    'activation-link': 'SEND_EMAIL_CONFIRM',
    'login': 'SEND_EMAIL_LOGIN',
    'logged-in': 'SUCCESSFULLY_LOGGED_IN'
}

const text = !page ? 'SUCCESFULLY_ACTIVATED' : textItems[page as string]

const title = {
    title: page === 'login' ? 'EMAIL_SEND' : 'CONFIRMED',
    heading: 'h1'
}

const button = {
    text: page === 'logged-in' ? 'GO_HOME' : 'GO_LOGIN',
    to: page === 'logged-in' ? '/' : '/login'
}
</script>