<template>
    <div class="flex justify-center">
        <div class="login-section flex flex-column gap-2">
            <div class="img-section">
                <TitleDynamic class="mb-1" :title="$t(title.title)" :heading="title.heading" />
                <AppImageContainer :img="img" columns="split"/>
            </div>
            <div class="input-container flex flex-column items-center gap-1">
                <InputBlock :value="email" id="email" label="Email" autocomplete="email" input-type="email" placeholder="example@gmail.com" :error="emailError" @input="setEmail" />
                <AppButton :loading="status === 'loading'" :text="$t(activeText)" @click="onSubmit"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Login } from '~/types/loginPage';

const props = defineProps<Login>()

const emits = defineEmits<{
  (e: 'submit', email: string): void
}>()

const img = {
    src: 'https://res.cloudinary.com/dt7uhy7jv/image/upload/f_auto,q_auto/v1/wedding/us_ny',
    alt: 'Emma & Mark in NY',
    sizes: '458 md:421'
}

const btnTxt = {
    login: 'LOGIN',
    create: 'CREATE',
}

const activeText = btnTxt[props.page]

const email = ref()
const emailError = ref()
function setEmail(emailInput: string) {
    email.value = emailInput
    emailError.value = undefined
}

function validateFields() {
    let hasError = false

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if(!email.value || !email.value.match(emailRegex)) {
        emailError.value = 'Fill a valid email in!'
        hasError = true
    }
    return hasError
}

function onSubmit() {
    if(!validateFields()) {
        emits('submit', email.value)
    }
}
</script>

<style scoped>
.button {
    align-self: center;
}

.img-section :deep(.img) {
    width: 316px;
    height: 421px;
    top: -107px;
}

@media screen and (min-width: 768px) {
    .input-container {
        width: 316px;
    }

    .img-section :deep(.img) {
        width: 344px;
        height: 458px;
        top: -130px;
    }
}
</style>