<template>
  <primitive :object="scene" />
</template>

<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

// const path = 'https://raw.githubusercontent.com/'
//   + 'Tresjs/assets/main/models/gltf/blender-cube.glb'
const path = '~/assets/models/love_bottle.glb'
const { scene, nodes, animations, materials } = await useGLTF(path, { draco: true })
console.log(scene)
</script>