<script setup lang="ts">
import { Pane } from 'tweakpane';

const props = defineProps<{
    state: any
}>()

const emits = defineEmits<{
    (e: 'onUpdate', state: any): void
}>()

const state = reactive(
    props.state
)
const pane = new Pane({
    title: 'Parameters',
})

const f1 = pane.addFolder({
    title: 'Camera',
    expanded: false
})

f1.addBinding(state.cameraPosition, 'x', {
  min: -3, max: 3, step: 0.1
})
f1.addBinding(state.cameraPosition, 'y', {
  min: -3, max: 3, step: 0.1
})
f1.addBinding(state.cameraPosition, 'z', {
  min: -3, max: 3, step: 0.1
})

const f2 = pane.addFolder({
    title: 'Model',
    expanded: true
})

f2.addBinding(state.modelRotation, 'x', {
  min: 0, max: 3, step: 0.01
})
f2.addBinding(state.modelRotation, 'y', {
  min: 0, max: 3, step: 0.01
})
f2.addBinding(state.modelRotation, 'z', {
  min: 0, max: 3, step: 0.01
})

watch(state, (newValue) => {
    emits('onUpdate', newValue)
})
</script>