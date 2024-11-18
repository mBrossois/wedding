<script setup lang="ts">
</script>

<template>
    <div class="page">
        <div class="stats section">
            <TitleDynamic title="Statistics" heading="h1" />
        </div>
        <div class="stats section">
            <TitleDynamic class="mb-1" title="Guests" heading="h1" />
            <SectionGuests />
        </div>
        <div class="stats section">
            <TitleDynamic title="Rooms" heading="h1" />
            <SectionRooms />
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