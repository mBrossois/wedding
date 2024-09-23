<template>
    <TresCanvas>
    <TresPerspectiveCamera
      :position="[3, 3, 3]"
      :fov="45"
      :look-at="[0, 0, 0]"
    />
    <Suspense>
      <AppLoveBottlePrimitive />
    </Suspense>
    <!-- <TresPrimitive :object="scene"></TresPrimitive> -->
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>

<script setup lang="ts">
</script>