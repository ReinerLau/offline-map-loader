<script setup lang="ts">
import { useOfflineMap } from 'use-offline-map'
import { onMounted } from 'vue'

const x = (113.157014 + 113.69204200000001) / 2
const y = (22.20103800000001 + 22.772601999999978) / 2
const center = [x, y]
const { UseOFFlineMap, addMark } = useOfflineMap(
  { center, zoom: 11, maxZoom: 12, minZoom: 11 },
  { limitExtend: true, showGrid: true }
)

onMounted(() => {
  addMark(x, y)
  addMark(x + 0.2, y + 0.2)
})
</script>

<template>
  <UseOFFlineMap></UseOFFlineMap>
</template>
