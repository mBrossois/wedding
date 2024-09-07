<template>
    <div class="flex flex-column items-center gap-2 mt-2 px-1">
        <TitleDynamic title="Welcome All & Nick!" heading="h1" />
        <AppParagraph class="px-1" text="We will have our wedding on 7 Juli and like to invite you to join us on this beautiful day." />
        <div class="flex flex-column items-center gap-1">
            <TitleDynamic title="Will you be attending our wedding?" heading="h2" />
            <div class="flex justify-center gap-1">
                <AppRadioBtn value="yes" label="yes" name="attend_wedding" />
                <AppRadioBtn value="no" label="no" name="attend_wedding" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
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