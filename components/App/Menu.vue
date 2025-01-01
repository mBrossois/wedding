<template>
    <nav class="menu absolute rounded-large mt-0_5" :class="{open: open}">
        <div v-for="(menuSection, index) in menuItems" :key="index" class="menu-block flex flex-column gap-1">
            <div v-for="menuItem in menuSection.sections" :key="menuItem.title" :class="{hidden: menuItem.hidden}" class="flex flex-column gap-1">
                <div class="flex items-center justify-between">
                    <AppLink :to="setTo(menuItem.to)" :text="$t(menuItem.title)" :no-arrow="menuItem.isLanguage" class="menu-item" size="large" :has-underline="false" @on-click="click(menuItem.title)"/>
                    <div><IconsFlagSelector v-if="menuItem.isLanguage" :open="flagsOpen" @on-click="toggleOpen"/></div>
                </div>
            </div>
            <hr v-if="index !== menuItems.length - 1" class="section-line mb-1" />
        </div>
    </nav>
</template>

<script setup lang="ts">
import { useToasterStore } from '~/store/toaster';
import { useUsersStore } from '~/store/users'

defineProps<{
    open: Boolean
}>()

const emits = defineEmits<{(e: 'onClose'): void}>()

const userStore = useUsersStore()
const { getRole } = storeToRefs(userStore)

const localePath = useLocalePath()
function setTo(route?: string) {
    return route ? localePath(route) : undefined
}

const menuItems: ComputedRef<Array<{sections: 
    Array<{title: string, to?: string, hidden?: boolean, isLanguage?: boolean, isBtn?: boolean}>
}>> = computed(() => getRole.value ? [
    {
        sections: [
            {
                title: 'Guests',
                to: '/guests'
            },
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
        ]
    }, {
        sections: [{
            title: 'LANGUAGE',
            isLanguage: true
        }]
    },
    {
        sections: [{
            title: 'ADMIN',
            to: '/admin',
            hidden: getRole.value !== 'admin'
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

const flagsOpen = ref(false)
function toggleOpen() {
    flagsOpen.value = !flagsOpen.value
}

const flagSelector = ref()
async function click(menuItem: string) {
    if(menuItem === 'LOG_OUT') {
        const response = await $fetch('/api/logout', {
            method: 'post',
            headers: useRequestHeaders(['cookie'])
        })

        if(response === 'Logged out') {
            userStore.setRole(undefined)
            const localePath = useLocalePath()
            navigateTo(localePath('/login'))
        } else {
            const toastStore = useToasterStore()
            toastStore.addToast({type: 'error', message: 'Could not log you out'})
        }
    }

    if(menuItem === 'LANGUAGE') {
        toggleOpen()
    } else {
        emits('onClose')
    }
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
    width: 100%;
}

.menu-item .link {
    overflow: visible;
}

.menu-block:has(> .hidden) {
    display: none;
}
</style>