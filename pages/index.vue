<template>
    <div class="flex flex-column gap-2 mt-2 px-2">
        <TitleDynamic title="Welcome All & Nick!" heading="h1" />
        <AppParagraph :text="$t('WEDDING_INVITATION')" />
        <div class="flex gap-1">
            <fieldset class="attendance-field flex flex-column gap-1" @input="updateAttendance">
                <legend class="mb-1"><TitleDynamic title="Will you be attending our wedding?" heading="h2" /></legend>
                <div class="flex gap-1">
                    <AppRadioBtn :checked="!!guestsStore.getIsComing" value="yes" label="yes" name="attend_wedding" />
                    <AppRadioBtn :checked="!guestsStore.getIsComing" value="no" label="no" name="attend_wedding" />
                </div>
            </fieldset>
            <div id="love-bottle">
                <Suspense>
                    <ThreeLoveBottle />
                </Suspense>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGuestsStore } from '~/store/guests';
import { useToasterStore } from '~/store/toaster';

const user = useSupabaseUser()
const guestsStore = useGuestsStore()
const toasterStore = useToasterStore()

if(user.value?.email) {
    await guestsStore.setInitialGuestsBook(user.value.email)
}

async function updateAttendance(value: any) {
    const response = await $fetch('/api/attendance', {
        method: 'patch',
        body: {
            attendance: value.originalTarget.value,
            id: guestsStore.getGuestBookId
        },
        headers: useRequestHeaders(['cookie'])
    })

    if(response === "Updated attendance") {
        guestsStore.setGuestComing(value.originalTarget.value === 'yes')
    } else {
        toasterStore.addToast({
            type: 'error',
            message: 'Could not set you attendance.'
        })
    }
}
</script>

<style scoped>
.attendance-field {
    border: unset;
    position: relative;
    z-index: 1000;
}

#love-bottle {
    height: 118px;
    width: 140px;
}
</style>