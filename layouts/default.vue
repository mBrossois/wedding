<template>
    <div>
        <AppHeader class="navbar" />
        <AppLayout>
            <slot />
        </AppLayout>
        <AppToaster />
    </div>
</template>

<script setup lang="ts">
import { useGuestsStore } from '~/store/guests';

const user = useSupabaseUser()
const guestsStore = useGuestsStore()

if(user.value?.email) {
    await guestsStore.setInitialGuestsBook(user.value.email)
}
</script>

<style scoped>
.navbar {
    padding-top: 30px;
}
</style>