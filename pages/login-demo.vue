<template>
    <div>
        <div class="img-section">
            <ImageAltar/>
        </div>
        <div class="button-section flex flex-centered">
            <AppButton :text="$t('DEMO_LOGIN')" @click="onDemoLogin"/>
        </div>
    </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()

async function onDemoLogin() {
    const { error } = await supabase.auth.signInAnonymously()
    if (!error) {
        const localePath = useLocalePath()
        navigateTo(localePath('/'))
    }
}
</script>

<style scoped>
.img-section,
.button-section {
    margin-top: 32px;
}
</style>
