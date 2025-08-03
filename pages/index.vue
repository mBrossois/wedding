<template>
    <TitleDynamic :title="`${$t('WELCOME')} ${firstNames}!`" heading="h1" />
    <AppParagraph :text="$t('WEDDING_INVITATION')" />

    <fieldset class="attendance-field flex flex-column gap-1">
        <legend class="mb-1"><TitleDynamic :title="$t('ATTENDING_WEDDING')" heading="h2" /></legend>
        <div class="flex gap-1">
            <AppRadioBtn :checked="!!getIsComing" :is-light="false" value="yes" :label="$t('YES')" name="attend_wedding" @onclick="updateAttendance" />
            <AppRadioBtn :checked="!getIsComing" :is-light="false" value="no" :label="$t('NO')" name="attend_wedding" @onclick="updateAttendance" />
        </div>
    </fieldset>
    <AppLink class="transition-300 m-auto" :class="[`opacity-${!!getIsComing ? 1 : 0}`, {'no-events': !getIsComing}]" :text="$t('SHARE_AVAILABILITY')" :to="localePath('/my-info')"/>

    <div class="responsive-grid flex flex-column gap-2">
        <AppImageContainer :img="img" columns="split" />

        <div class="flex gap-1 flex-column">
            <TitleDynamic :title="$t('ROOMS')" heading="h2" />
            <AppParagraph :text="`${$t('AVAILABLE')} - ${rooms.available} / ${rooms.total}`" />
            <AppButton small-text :text="$t('BOOK_ROOM')" :to="localePath('/rooms')" />
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
    </div>
</template>

<script setup lang="ts">
import { useGuestsStore } from '~/store/guests';
import { useToasterStore } from '~/store/toaster';

const guestsStore = useGuestsStore()
const toasterStore = useToasterStore()

const { getIsComing, getGuests } = storeToRefs(guestsStore)

const rooms = ref({available: 0, total: 0})

console.time('initial-page')

const response = await $fetch('/api/rooms-all-count', {
    method: 'get',
    headers: useRequestHeaders(['cookie'])
})

if(response !== 'Something went wrong') {
    rooms.value = response
}

const firstNames = computed(() => getGuests.value?.map(guest => { return guest.firstName}).join(' & ') || '')

const localePath = useLocalePath()

const img = {
    src: '/f_auto,q_auto/v1/wedding/us_bridge',
    alt: 'Emma & Mark on bridge',
    sizes: '344'
}

const firstDay = [
    {time: '15:00', activity: 'WELCOMING'},
    {time: '16:00', activity: 'CEREMONY'},
    {time: '17:00', activity: 'RECEPTION'},
    {time: '19:00', activity: 'DINNER'},
    {time: '22:00', activity: 'PARTY'},
    {time: '03:00', activity: 'END_PARTY'},
]

const secondDay = [
    {time: '08:00', activity: 'BREAKFAST'},
    {time: '11:00', activity: 'CHECK_OUT'},
]

console.timeEnd('initial page')

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