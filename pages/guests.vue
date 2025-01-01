<template>
    <AppLayout>
        <TitleDynamic heading="h1" :title="$t('COMING')" />
        <AppButton :text="$t('ADD_GUEST')" @click="addGuest" />
        <table>
            <thead>
                <tr>
                    <th><AppParagraph size="large" :text="$t('FIRSTNAME')" /></th>
                    <th class="last-name"><AppParagraph size="large" :text="$t('LASTNAME')" /></th>
                    <th><AppParagraph size="large" :text="$t('AGE')" /></th>
                    <th></th>
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
    </AppLayout>
</template>

<script setup lang="ts">
import { useGuestsStore } from '~/store/guests';
import type { Guest } from '~/types/guests';

const guestsStore = useGuestsStore()
const { getGuests } = storeToRefs(guestsStore)

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