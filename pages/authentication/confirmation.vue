<template>
    <div class="confirmation flex justify-center mt-2">
        <div class="page-width flex flex-column gap-1 ">
            <TitleDynamic :title="title.title" :heading="title.heading" />
            <AppParagraph text="We send an email with a resend link!" />
            <div class="m-auto">
                <AppButton text="Go back to login" to="/authentication/login"/>
            </div>
        </div>
            
    </div>
</template>

<script setup lang="ts">

const title = {
    title: 'Confirmed',
    heading: 'h1'
}
</script>