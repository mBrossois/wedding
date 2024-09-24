<template>
  <primitive :rotation-x="rotationX" :rotation-y="rotationY" :rotation-z="rotationZ" :position-y="-.3" :object="scene" />
</template>

<script setup lang="ts">
import { useGLTF, useAnimations } from '@tresjs/cientos'

const props = defineProps<{
    modelRotation: {
        x: number,
        y: number,
        z: number
    }
}>()

const rotationX = computed(() => Math.PI * props.modelRotation.x)
const rotationY = computed(() => Math.PI * props.modelRotation.y)
const rotationZ = computed(() => Math.PI * props.modelRotation.z)

const path = 'https://raw.githubusercontent.com/'
  + 'mBrossois/wedding/refs/heads/main/assets/models/love_bottle/scene.gltf'
const { scene, nodes, animations, materials } = await useGLTF(path, { draco: true })

const { actions, mixer } = useAnimations(animations, scene)

const currentAction = actions['Take 001']

currentAction.play()
</script>