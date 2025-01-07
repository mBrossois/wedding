<template>
    <label class="switch">
        <input type="checkbox" v-model="check" @click="onClick">
        <div class="slider round" />
    </label>
</template>

<script setup lang="ts">
const props = defineProps<{
    checked: boolean
}>()
const emits = defineEmits<{
    (e: 'click', checked: boolean): void
}>()

const check = ref(!props.checked)

function onClick() {
    emits('click', check.value)
}
</script>

<style scoped>
 /* The switch - the box around the slider */
 .switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 24px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid var(--gray-darkest);
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 1px;
  top: 1px;
  background-color: transparent;
  border: 1px solid var(--gray-darkest);
  -webkit-transition: .4s;
  transition: .4s;
  z-index: 100;
}

input:checked + .slider {
  background-color: var(--gray-lightest);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--gray-lightest);
}

input:checked + .slider:before,
input:checked + .slider:after {
  -webkit-transform: translateX(28px);
  -ms-transform: translateX(28px);
  transform: translateX(28px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before,
.slider.round:after {
  border-radius: 50%;
} 
</style>