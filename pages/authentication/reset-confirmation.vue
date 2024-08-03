<template>
    <div class="confirmation flex items-center flex-column gap-1">
            <TitleDynamic :title="title.title" :heading="title.heading" />

            <AppButton text="Enter" @click=""/>
        </div>
</template>

<script setup lang="ts">
const title = {
    title: 'Confirmed',
    heading: 'h1'
}
</script>