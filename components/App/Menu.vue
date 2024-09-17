<template>
    <div class="menu absolute rounded-large mt-0_5" :class="{open: open}">
        <div v-for="(menuSection, index) in menuItems" class="flex flex-column gap-1">
            <div v-for="menuItem in menuSection.sections" class="flex flex-column gap-1">
                <div class="flex items-center justify-between">
                    <AppLink v-if="menuItem.to || menuItem.isBtn" :to="menuItem.to" :text="$t(menuItem.title)" class="menu-item" size="large" />
                    <AppParagraph v-else :text="$t(menuItem.title)" size="large" />
                    <div><IconsFlagSelector v-if="menuItem.isLanguage" /></div>
                </div>
            </div>
            <hr v-if="index !== menuItems.length - 1" class="section-line mb-1" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '~/store/users'
import { RoleEnum } from '~/types/users';

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
            title: 'MY_INFO',
            to: '/my-info'
        }]
    },
    {
        sections: [
            {
                title: 'ROOMS',
                to: '/rooms'
            },
            {
                title: 'SCHEDULE',
                to: '/schedule'
            },
            {
                title: 'LOCATION',
                to: '/location'
            },
            {
                title: 'PRESENT_TIPS',
                to: '/present-tips'
            },
        ]
    }, {
        sections: [{
            title: 'LANGUAGE',
            isLanguage: true
        }]
    },
    {
        sections: [{
            title: 'LOG_OUT',
            isBtn: true
        }]
    },
] : [{
        sections: [{
            title: 'LANGUAGE',
            isLanguage: true
        }]
    }]
)
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