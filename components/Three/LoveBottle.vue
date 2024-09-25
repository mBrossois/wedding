<template>
  <ClientOnly >
      <ThreeTweakPane v-if="isDev" :state="state" @onUpdate="setReactiveState"/>
  </ClientOnly>
  <TresCanvas preset="realistic">
    <Stats v-if="isDev" />
    <TresPerspectiveCamera
      :position="[state.cameraPosition.x, state.cameraPosition.y, state.cameraPosition.z]"
      :fov="45"
      :look-at="[0, 0, 0]"
    />
    <Suspense>
      <ThreeLoveBottlePrimitive :modelRotation="state.modelRotation" />
    </Suspense>
    <TresAmbientLight :intensity=".3" />
    <TresDirectionalLight :intensity="2.5" />
  </TresCanvas>
</template>

<script setup lang="ts">
const isDev = import.meta.env.DEV
const state = reactive({
  cameraPosition: {
    x: 0,
    y: -0.2,
    z: 1.8
  },
  modelRotation: {
    x: .2,
    y: 1.26,
    z: 0.06
  }
})

function setReactiveState(state: any) {
  state.value = state
}
</script>