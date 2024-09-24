<template>
    <div class="flex flex-column gap-2 mt-2 px-2">
        <TitleDynamic title="Welcome All & Nick!" heading="h1" />
        <AppParagraph :text="$t('WEDDING_INVITATION')" />
        <fieldset class="attendance-field flex flex-column gap-1" @input="updateAttendance">
            <legend><TitleDynamic title="Will you be attending our wedding?" heading="h2" /></legend>
            <div class="flex justify-center gap-1">
                <AppRadioBtn value="yes" label="yes" name="attend_wedding" />
                <AppRadioBtn value="no" label="no" name="attend_wedding" />
            </div>
        </fieldset>
        <div id="love-bottle">
            <Suspense>
                <AppTresLoveBottle />
            </Suspense>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGuestsStore } from '~/store/guests';

const user = useSupabaseUser()
const guestsStore = useGuestsStore()

if(user.value?.email) {
    await guestsStore.setInitialGuestsBook(user.value.email)
}

async function updateAttendance(value: any) {
    const response = await $fetch('/api/attendance', {
        method: 'patch',
        body: {
            attendance: value.originalTarget.value,
            email: user.value?.email
        },
        headers: useRequestHeaders(['cookie'])
    })
}
</script>

<style scoped>
.attendance-field {
    border: unset;
}

#love-bottle {
    height: 320px;
    width: 320px;
    border: 1px solid black;
}
</style>