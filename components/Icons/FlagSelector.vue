<template>
    <img class="rounded-small" :src="FrenchFlag" alt="Flag" @click="onClick('fr')" />
    <img class="rounded-small" :src="DutchFlag" alt="Flag" @click="onClick('nl')" />
    <img class="rounded-small" :src="EnglishFlag" alt="Flag" @click="onClick('en')" />
</template>

<script setup lang="ts">
import DutchFlag from '~/assets/img/Dutch-flag.svg'
import EnglishFlag from '~/assets/img/English-flag.svg'
import FrenchFlag from '~/assets/img/French-flag.svg'

const emits = defineEmits<{
  (e: 'click', language: string): void
}>()

function onClick(language: string) {
    emits('click', language)
}
</script>