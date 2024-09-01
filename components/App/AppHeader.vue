<template>
    <header class="header px-1">
        <div class="header-body flex">
            <p class="lavishly-yours-regular logo">Mark & Emma's wedding</p>
            <div v-if="getRole">hamburger</div>
        </div>
        <div class="line"></div>
    </header>
</template>

<script setup lang="ts">
import { useUsersStore } from '~/store/users'
import { RoleEnum } from '~/types/users';

const userStore = useUsersStore()
const { getRole } = storeToRefs(userStore)

onMounted(() => {
    const user = useSupabaseUser()
    if(user.value) {
        console.log(user.value)

        userStore.setRole(RoleEnum.loggedIn)
    }
})
</script>

<style scoped>
.logo {
    font-size: 32px;
}

.header-body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 68px;
}

.header .line {
    height: 1px;
    width: 100%;
    background-color: var(--gray-medium);
    border-radius: 15px;
}
</style>