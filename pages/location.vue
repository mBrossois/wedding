<template>
    <TitleDynamic :title="$t('LOCATION')" heading="h1" />
    <AppParagraph :text="$t('LOCATION_DESCRIPTION')" />
    <img class="image castle" src="~/assets/img/vaeshartelt-castle.jpg" alt="Castle Vaeshartelt" height="677" width="1000"/>
    <div>
        <AppParagraph :text="$t('LOCATION_TO_SEE')" />
        <ul>
            <li><AppSpan :text="$t('BUTTERFLY_GARDEN')" /></li>
            <li><AppSpan :text="$t('VINEYARD')" /></li>
            <li><AppSpan :text="$t('TEA_DOME')" /></li>
            <li><AppSpan :text="$t('STAR_FOREST')" /></li>
            <li><AppSpan :text="$t('OUTSIDER')" /></li>
        </ul>
    </div>
    
    <TitleDynamic :title="$t('MAP_TERAIN')" heading="h2" />
    <img class="image terrain" src="~/assets/img/map-terrain.png" alt="Map terrain" height="723" width="1000"/>
    
    <TitleDynamic :title="$t('ADDRESS')" heading="h2" />
    <AppParagraph :text="$t('DISTANCE')" />
    <SectionVaesharteltMap />

    <button class="btn flex justify-between" @click="copyToClipboard">
        <AppSpan :text="$t('ADRESS_SPECIFIC')" />
        <IconsCopy />
    </button>

</template>

<script setup lang="ts">
  const i18n = useI18n()

function copyToClipboard() {
  navigator.clipboard.writeText(i18n.messages.value[i18n.locale.value].ADRESS_SPECIFIC.toString());
}
</script>

<style scoped>
.image {
    width: 316px;
    border-radius: 50px;
}
.image.castle {
    height: 211px;
}

.image.terrain {
    height: 230px;
}

ul {
    list-style: inside;
}

.btn {
    border: none;
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