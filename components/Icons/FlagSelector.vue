<template>
  <NuxtLink v-for="localeItem in locales" :key="localeItem.code" :to="switchLocalePath(localeItem.code)" :class="{open}" class="locale" :style="`--position: ${localeFlags[localeItem.code].position}`" @click="localeClicked(localeItem.code)">
    <NuxtImg class="rounded-small flag" :src="getLocaleFlag(localeItem.code)" alt="Flag" />
  </NuxtLink>
</template>

<script setup lang="ts">
// import DutchFlag from '~/assets/img/Dutch-flag.svg'
// import EnglishFlag from '~/assets/img/'
// import FrenchFlag from '~/assets/img/French-flag.svg'

const DutchFlag = "/img/Dutch-flag.svg"
const EnglishFlag = "/img/English-flag.svg"
const FrenchFlag = "/img/French-flag.svg"

defineProps<{open: boolean}>()
const emits = defineEmits<{
  (e: 'onClick'): void
}>()

const switchLocalePath = useSwitchLocalePath()

const { locale, locales } = useI18n()

function localeClicked(item: string) {
  if(item !== locale.value) {
    updateLocalePosition(item)
  }
  emits('onClick')
}

const localeFlags: Ref<{[key: string]: {flag: string, position: number}}> = ref({ nl: {flag: DutchFlag, position: 1}, en: {flag: EnglishFlag, position: 0}, fr: {flag: FrenchFlag, position: 2}})
function getLocaleFlag(code: string) {
  return localeFlags.value[code].flag
}


function updateLocalePosition(item: string) {
  let counter = 1;
  for(const localeItem in localeFlags.value) {
    if(localeItem === item) {
      localeFlags.value[localeItem].position = 0
    } else {
      localeFlags.value[localeItem].position = counter
      counter++
    }
  }
}

onMounted(() => {
  updateLocalePosition(locale.value)
})
</script>

<style scoped>
.locale {
  position: absolute;
  right: 1.5rem;
  transform: translate(calc(-3rem * var(--position)), -5px);
  transition: all 200ms ease-in-out;
}
.locale:not(.router-link-active):not(.open) {
  visibility: hidden;
  transform: translate(0, -5px);
  z-index: 500;
}

.locale.router-link-active {
  z-index: 1000;
}

.locale .flag {
  width: 20px;
}
</style>