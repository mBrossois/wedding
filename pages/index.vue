<template>
    <div class="flex flex-column gap-2 mt-2 px-2">
        <TitleDynamic title="Welcome All & Nick!" heading="h1" />
        <AppParagraph :text="$t('WEDDING_INVITATION')" />
        <div class="flex flex-column gap-1">
            <TitleDynamic title="Will you be attending our wedding?" heading="h2" />
            <div class="flex justify-center gap-1">
                <AppRadioBtn value="yes" label="yes" name="attend_wedding" />
                <AppRadioBtn value="no" label="no" name="attend_wedding" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// const { locale, setLocale } = useI18n()
const user = useSupabaseUser()

if(user.value?.email) {
    const { data } = await useFetch('/api/guests', {
        method: 'get',
        query: {
            email: user.value.email
        },
        headers: useRequestHeaders(['cookie'])
    })
}
</script>