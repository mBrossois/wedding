<template>
    <div class="menu absolute rounded-large mt-0_5" :class="{open: open}">
        <div v-for="(menuSection, index) in menuItems" class="flex flex-column gap-1">
            <div v-for="menuItem in menuSection.sections" class="flex flex-column gap-1">
                <div class="menu-item flex gap-2 items-center">
                    <AppLink :to="menuItem.to" :text="menuItem.title" size="large" />
                    <IconsFlagSelector v-if="menuItem.isLanguage" @click="setLanguage" />
                </div>
            </div>
            <hr v-if="index !== menuItems.length - 1" class="section-line mb-1" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '~/store/users'
import { RoleEnum } from '~/types/users';
const { locale, setLocale } = useI18n()

defineProps<{
    open: Boolean
}>()

const userStore = useUsersStore()
const { getRole } = storeToRefs(userStore)

const user = useSupabaseUser()
if(user.value) {
    userStore.setRole(RoleEnum.loggedIn)
}

const menuItems = computed(() => getRole.value ? [
    {
        sections: [{
            title: 'My info',
            to: '/my-info'
        }]
    },
    {
        sections: [
            {
                title: 'Rooms',
                to: '/rooms'
            },
            {
                title: 'Schedule',
                to: '/schedule'
            },
            {
                title: 'Location',
                to: '/location'
            },
            {
                title: 'Present tips',
                to: '/present-tips'
            },
        ]
    }, {
        sections: [{
            title: 'Language',
            isLanguage: true
        }]
    },
    {
        sections: [{
            title: 'Log out',
        }]
    },
] : [{
        sections: [{
            title: 'Language',
            isLanguage: true
        }]
    }]
)

function setLanguage(language: string) {
    setLocale(language)
}
</script>

<style scoped>
.menu {
    width: 328px;
    background-color: var(--gray-lighter);
    padding: 1.25rem 1.5rem;
    right: 1rem;
    transform: translate(1rem, -1rem) scale(0);
    transform-origin: top right;
    opacity: 0;

    z-index: 1000;

    transition: all 250ms ease-in-out;
}

.menu.open {
    transform: translate(0, 0) scale(1);
    opacity: 1;
}


.menu-item {
    cursor: pointer;
    width: fit-content;
}

.menu-item .link {
    overflow: visible;
}
</style>