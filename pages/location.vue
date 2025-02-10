<template>
    <TitleDynamic :title="$t('LOCATION')" heading="h1" />
    <AppParagraph :text="$t('LOCATION_DESCRIPTION')" />
    <div class="tablet-double-column">
        <img class="image castle" loading="lazy" src="https://res.cloudinary.com/dt7uhy7jv/image/upload/f_auto,q_auto/v1/wedding/vaeshartelt-castle" alt="Castle Vaeshartelt" height="677" width="1000"/>
        <div>
            <AppParagraph :text="$t('LOCATION_TO_SEE')" />
            <ul class="list-inside">
                <li><AppSpan :text="$t('BUTTERFLY_GARDEN')" /></li>
                <li><AppSpan :text="$t('VINEYARD')" /></li>
                <li><AppSpan :text="$t('TEA_DOME')" /></li>
                <li><AppSpan :text="$t('STAR_FOREST')" /></li>
                <li><AppSpan :text="$t('OUTSIDER')" /></li>
            </ul>
        </div>

        <div class="flex flex-column gap-2">
            <TitleDynamic :title="$t('ADDRESS')" heading="h2" />
            <AppParagraph :text="$t('DISTANCE')" />
            <SectionVaesharteltMap />

            <button class="btn flex justify-between" @click="copyToClipboard">
                <AppSpan :text="$t('ADRESS_SPECIFIC')" />
                <IconsCopy />
            </button>
        </div>
        
        <div class="flex flex-column gap-2">
            <TitleDynamic :title="$t('MAP_TERAIN')" heading="h2" />
            <img class="image terrain" loading="lazy" src="https://res.cloudinary.com/dt7uhy7jv/image/upload/f_auto,q_auto/v1/wedding/map-terrain" alt="Map terrain" height="723" width="1000" @click="openModal()"/>
        </div>
    </div>

    <AppModal class="modal-container" :isOpen="modalOpen" :title="$t('MAP_TERAIN')" :buttons="[]" size="full" @onClose="closeModal()">
        <img class="image terrain full" loading="lazy" src="https://res.cloudinary.com/dt7uhy7jv/image/upload/f_auto,q_auto/v1/wedding/map-terrain" alt="Map terrain" height="723" width="1000"/>
    </AppModal>
</template>

<script setup lang="ts">
import { useToasterStore } from '~/store/toaster';

const i18n = useI18n()
const toasterStore = useToasterStore()

function copyToClipboard() {
  navigator.clipboard.writeText(i18n.messages.value[i18n.locale.value].ADRESS_SPECIFIC.toString());
  toasterStore.addToast({
    message: 'Added to clipboard',
    type: 'info'
  })
}

const modalOpen = ref(false)

function openModal() {
    modalOpen.value = true
    document.documentElement.style.overflow = 'hidden'
}

function closeModal() {
    modalOpen.value = false
    document.documentElement.style.overflow = 'auto'
}
</script>

<style scoped>
.image {
    width: 326px;
    border-radius: 50px;
}
.image.castle {
    height: 218px;
}

.image.terrain:not(.full) {
    height: 238px;
    cursor: pointer;
}

.image.terrain.full {
    height: auto;
    width: 100%;
}

.modal-container :deep(.modal) {
    top: 3rem;
    width: calc(var(--page-width) - 4rem);
    height: 310px;
}

@media screen and (min-width: 768px) {
    .modal-container :deep(.modal) {
        height: 584px;
    }
}

@media screen and (min-width: 1024px) {
    .modal-container :deep(.modal) {
        height: 769px;
    }
}

.btn {
    border: none;
    background-color: transparent;
}

.btn:hover {
    background-color: transparent;
    color: var(--gray-dark);
    cursor: pointer;
}

.btn:hover :deep(path),
.btn:hover :deep(rect) {
    stroke: var(--gray-dark);
}
</style>