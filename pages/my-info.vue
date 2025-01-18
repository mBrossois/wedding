<template>
    <TitleDynamic heading="h1" :title="$t('MY_INFO')" />

    <div class="flex justify-between wrap gap-2">
        <div>
            <TitleDynamic class="mb-1" heading="h2" :is-large="true" :title="$t('IMPORTANT_INFO')" />
            <AppTextArea :value="getImportantInformation || ''" :placeholder="$t('IMPORTANT_INFO_PLACEHOLDER')" @input="updateImportantInfo" />
        </div>
        <div>
            <TitleDynamic heading="h2" :is-large="true" :title="$t('COMING')" />
            <AppButton :text="$t('ADD_GUEST')" @click="addGuest" />
        </div>
    </div>

    <table class="w-fit">
        <thead>
            <tr>
                <th class="tw-l" ><AppParagraph size="large" :text="$t('FIRSTNAME')" /></th>
                <th class="tw-l"><AppParagraph size="large" :text="$t('LASTNAME')" /></th>
                <th class="tw-s"><AppParagraph size="large" :text="$t('AGE')" /></th>
                <th class="tw-s"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="guest in getGuests" :key="guest.id">
                <td><InputBlock variant="secondary" placeholder="John" :id="guest.firstName" :value="guest.firstName" @input="updateGuest($event, 'firstName', guest.id)" /></td>
                <td><InputBlock variant="secondary" placeholder="Doe" :id="guest.lastName" :value="guest.lastName" @input="updateGuest($event, 'lastName', guest.id)" /></td>
                <td><AppRadioBtn :value="guest.id.toString()" :name="guest.id.toString()" :checked="!!guest.isAdult" @onclick="updateGuest($event, 'isAdult', guest.id)"  /></td>
                <td><IconsDelete class="icon" @click="deleteGuest(guest.id)"/></td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { useGuestsStore } from '~/store/guests';
import type { Guest } from '~/types/guests';

const guestsStore = useGuestsStore()
const { getGuests, getImportantInformation } = storeToRefs(guestsStore)

async function addGuest() {
    const id = guestsStore.addGuest()
    const response = await $fetch('/api/guest-list', {
        method: 'post',
        body: {
            id: guestsStore.getGuestBookId,
            amountAdults: getGuests.value?.filter(guest => !guest.isChild).length
        },
        headers: useRequestHeaders(['cookie'])
    })
    guestsStore.updateGuestId(id, response.data[0].id)
}

async function updateGuest(value: string | boolean, variant: keyof Guest, id: number) {
    const guest = guestsStore.updateGuest(value, variant, id)
    const response = await $fetch('/api/guest-list', {
        method: 'patch',
        body: {
            guest
        },
        headers: useRequestHeaders(['cookie'])
    })
}

async function deleteGuest(id: number) {
    guestsStore.deleteGuest(id)
    const response = await $fetch('/api/guest-list', {
        method: 'delete',
        body: {
            id
        },
        headers: useRequestHeaders(['cookie'])
    })
}

async function updateImportantInfo(value: string) {
    guestsStore.updateImportantInformation(value)
    await $fetch('/api/important-info', {
        method: 'patch',
        body: {
            importantInfo: value,
            guestBookId: guestsStore.getGuestBookId
        },
        headers: useRequestHeaders(['cookie'])
    })
}
</script>


<style scoped>
.icon {
    fill: var(--gray-darkest);
    transition: fill ease-in-out 200ms;
}
.icon:hover {
    cursor: pointer;
    fill: var(--gray-medium);

}

.last-name {
    width: 112px;
}
</style>