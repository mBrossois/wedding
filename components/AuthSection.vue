<template>
    <div class="flex justify-center mt-2">
        <div class="login-section flex flex-column gap-2">
            <TitleDynamic :title="title.title" :heading="title.heading" />
            <div class="flex flex-column items-center gap-1">
                <InputBlock :value="email" id="email" label="Email" autocomplete="email" input-type="email" placeholder="example@gmail.com" :error="emailError" @input="setEmail" />
                <AppButton :text="activeText" @click="onSubmit"/>
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

const btnTxt = {
    login: 'login',
    create: 'create',
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
.login-section {
    width: var(--page-width);
}

.button {
    align-self: center;
}
</style>