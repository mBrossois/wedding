<template>
    <TitleDynamic :title="$t('LOCATION')" heading="h1" />
    <AppParagraph :text="$t('LOCATION_DESCRIPTION')" />
    <div class="tablet-double-column">
        <img class="image castle" loading="lazy" src="~/assets/img/vaeshartelt-castle.jpg" alt="Castle Vaeshartelt" height="677" width="1000"/>
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
            <img class="image terrain" loading="lazy" src="~/assets/img/map-terrain.png" alt="Map terrain" height="723" width="1000"/>
        </div>
    </div>

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
</script>

<style scoped>
.image {
    width: 326px;
    border-radius: 50px;
}
.image.castle {
    height: 218px;
}

.image.terrain {
    height: 238px;
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