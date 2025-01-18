<template>
    <label :class="{'is-light': isLight}" class="radio-btn flex gap-0_5 items-center">
        <input type="radio" class="rounded-small" :checked="checked" :name="name" :value="value" @click="sendClick">
        <IconsCheckmark :isLight="isLight" class="checkmark" />
        {{ label }}
    </label>
</template>

<script setup lang="ts">
const props = defineProps<{
    value: string,
    label?: string,
    name: string,
    checked: boolean,
    isLight?: boolean
}>()

const emits = defineEmits<{
    (e: 'onclick', value: string): void
}>()

function sendClick() {
    emits('onclick', props.value)
}
</script>

<style scoped>
.radio-btn {
    cursor: pointer;
    position: relative;
    z-index: 10;
}

.radio-btn.is-light input[type="radio"] {
    border-color: white;
}

input[type="radio"] {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    appearance: none;
    /* For iOS < 15 to remove gradient background */
    background-color: transparent;
    /* Not removed via appearance */
    margin: 0;

    color: black;
    width: 18px;
    height: 18px;
    border: 2px solid black;
    cursor: pointer;
}

input[type="radio"]:checked ~ .checkmark:deep() .path {
    transition: all 200ms ease-in-out;
    stroke-dashoffset: 0;
}

.checkmark {
    position: absolute;
    transform: translate(3px, -5px);
}
</style>