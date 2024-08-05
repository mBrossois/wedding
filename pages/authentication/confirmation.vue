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
import { useUsersStore } from '~/store/users';

const userStore = useUsersStore()
const { getConfirmation } = storeToRefs(userStore)

const textItems = {
    creation: 'We send and email to confirm your account.',
    forgotten: 'We send an email with a reset link.'
}

const text = getConfirmation.value ? 'Succesfully activated your account.' : textItems[getConfirmation.value!]

const title = {
    title: 'Confirmed',
    heading: 'h1'
}
</script>