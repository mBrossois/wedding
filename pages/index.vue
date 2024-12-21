<template>
    <div class="flex flex-column gap-2 mt-2 px-2">
        <TitleDynamic :title="`${$t('WELCOME')} ${firstNames}!`" heading="h1" />
        <AppParagraph :text="$t('WEDDING_INVITATION')" />

        <div class="flex gap-1 flex-column">
            <fieldset class="attendance-field flex flex-column gap-1">
                <legend class="mb-1"><TitleDynamic title="Will you be attending our wedding?" heading="h2" /></legend>
                <div class="flex justify-center gap-1">
                    <AppRadioBtn :checked="!!getIsComing" :is-light="false" value="yes" label="yes" name="attend_wedding" @onclick="updateAttendance" />
                    <AppRadioBtn :checked="!getIsComing" :is-light="false" value="no" label="no" name="attend_wedding" @onclick="updateAttendance" />
                </div>
            </fieldset>
            <AppLink class="transition-300 m-auto" :class="`opacity-${!!getIsComing ? 1 : 0}`" :text="$t('SHARE_AVAILABILITY')" :to="localePath('/my-info')"/>
        </div>
        
        <div class="flex gap-1 flex-column">
            <TitleDynamic :title="$t('SCHEDULE')" heading="h2" />
            <ul class="ml-1">
                <li class="mb-1">
                    <AppParagraph class="mb-0_5" :text="'8 ' + $t('AUGUST')"/>
                    <ul class="pl-1">
                        <li v-for="item in firstDay" :key="item.time">
                            <AppParagraph :text="item.time + ' - ' +$t(item.activity)"/>
                        </li>
                    </ul>
                </li>

                <li>
                    <AppParagraph class="mb-0_5" :text="'9 ' + $t('AUGUST')"/>
                    <ul class="pl-1">
                        <li v-for="item in secondDay" :key="item.time">
                            <AppParagraph :text="item.time + ' - ' +$t(item.activity)"/>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="ml-1">
                <AppButton small-text :text="$t('MORE_INFO')" :to="localePath('/schedule')" />
            </div>
        </div>

        <div class="flex gap-1 flex-column">
            <TitleDynamic :title="$t('LOCATION')" heading="h2" />
            <SectionVaesharteltMap />
            <AppButton small-text :text="$t('MORE_INFO')" :to="localePath('/location')" />
        </div>


        <div class="flex gap-1 flex-column">
            <TitleDynamic :title="$t('ROOMS')" heading="h2" />
            <AppParagraph :text="`${$t('AVAILABLE')} - ${rooms.available} / ${rooms.total}`" />
            <AppButton small-text :text="$t('BOOK_ROOM')" :to="localePath('/rooms')" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGuestsStore } from '~/store/guests';
import { useToasterStore } from '~/store/toaster';

const user = useSupabaseUser()
const guestsStore = useGuestsStore()
const toasterStore = useToasterStore()

const { getIsComing, getGuests } = storeToRefs(guestsStore)

const { data: rooms, refresh: refresPage } = await useFetch('/api/rooms-all', {
    method: 'get',
    headers: useRequestHeaders(['cookie'])
})

const firstNames = computed(() => getGuests.value?.map(guest => { return guest.firstName}).join(' & '))

const localePath = useLocalePath()

const firstDay = [
    {time: '15:00', activity: 'CHECK_IN'},
    {time: '16:00', activity: 'CEREMONY'},
    {time: '17:00', activity: 'APERATIF'},
    {time: '19:00', activity: 'DINNER'},
    {time: '22:00', activity: 'PARTY'},
    {time: '03:00', activity: 'END_PARTY'},
]

const secondDay = [
    {time: '08:00', activity: 'BREAKFAST'},
    {time: '11:00', activity: 'CHECK_OUT'},
]

if(user.value?.email) {
    await guestsStore.setInitialGuestsBook(user.value.email)
}

async function updateAttendance(value: string) {
    const response = await $fetch('/api/attendance', {
        method: 'patch',
        body: {
            attendance: value,
            id: guestsStore.getGuestBookId
        },
        headers: useRequestHeaders(['cookie'])
    })

    if(response === "Updated attendance") {
        guestsStore.setGuestComing(value === 'yes')
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
}
</style>