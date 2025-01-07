<template>
    <div class="flex flex-column gap-0_5">
        <TitleDynamic :title="`${time} | ${$t(title)}`" heading="h3" />
        <AppParagraph :text="$t(description)" />
        <div>
            <AppSpan :text="$t('LOCATION') + ': '" /> <AppSpan :text="location" />
        </div>
    </div>

</template>

<script setup lang="ts">
defineProps<{
    time: string,
    title: string,
    description: string,
    location: string
}>()
</script>