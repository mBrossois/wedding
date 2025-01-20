<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const overviewDone = ref(false)
function setOverviewDone() {
    overviewDone.value = true
}

const guestsDone = ref(false)
function setGuestsDone() {
    guestsDone.value = true
}

const roomsDone = ref(false)
function setRoomsDone() {
    roomsDone.value = true
}

const isLoading = computed(() => !overviewDone.value && !guestsDone.value && !roomsDone.value)
const startLoading = ref(false)

onMounted(() => {
    startLoading.value = true
})
</script>

<template>
    <div v-show="isLoading" class="flex justify-center p-2">
        <AppLoader />
    </div>
    <div v-if="startLoading">
        <div v-show="!isLoading" class="page">
            <div class="stats section">
                <TitleDynamic title="Overview" heading="h1" />
                <SectionOverview @done="setOverviewDone()" />
            </div>
            <div class="stats section">
                <TitleDynamic class="mb-1" title="Guests" heading="h1" />
                <SectionGuests @done="setGuestsDone()" />
            </div>
            <div class="stats section">
                <TitleDynamic title="Rooms" heading="h1" />
                <SectionRooms @done="setRoomsDone()" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.page .section:nth-child(even) {
    background-color: var(--gray-lightest);
}

.section {
    padding: 1rem calc((100vw - var(--page-width)) / 2);
}
</style>