<template>
    <div class="flex justify-center mt-2">
        <div class="login-section flex flex-column gap-2">
            <TitleDynamic :title="title.title" :heading="title.heading" />
            <div class="flex flex-column items-center gap-1">
                <InputBlock label="Email" input-type="email" placeholder="example@gmail.com" :error="emailError" @input="setEmail" />
                <InputBlock v-if="!hidePasswordField" label="Password" input-type="password" placeholder="*****" :error="passwordError" @input="setPassword" />
                <AppButton :text="activeText" @click="onSubmit"/>
                <AppLink v-if="showPasswordForgotten" to="/authentication/forgot-password" text="Forgot password" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Login } from '~/types/loginPage';

const props = defineProps<Login>()

const emits = defineEmits<{
  (e: 'submit', email: string, password: string): void
}>()

const hidePasswordField = props.page === 'passwordForgotten'
const showPasswordForgotten = props.page === 'login'

const btnTxt = {
    login: 'login',
    create: 'create',
    passwordForgotten: 'Send email',
    passwordReset: 'Reset password'
}

const activeText = btnTxt[props.page]

const email = ref()
const emailError = ref()
function setEmail(emailInput: string) {
    email.value = emailInput
    emailError.value = undefined
}

const password = ref()
const passwordError = ref()
function setPassword(passwordInput: string) {
    password.value = passwordInput
    passwordError.value = undefined
}

function validateFields() {
    let hasError = false
    if((!password.value || password.value.length <= 6) && props.page !== 'passwordForgotten') {
        passwordError.value = 'The password should be at least 6 characters long!'
        hasError = true
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if(!email.value || !email.value.match(emailRegex)) {
        emailError.value = 'Fill a valid email in!'
        hasError = true
    }
    return hasError
}

function onSubmit() {
    if(!validateFields()) {
        emits('submit', email.value, password.value)
    }
}
</script>

<style scoped>
.login-section {
    width: var(--width-mobile);
}

.button {
    align-self: center;
}
</style>