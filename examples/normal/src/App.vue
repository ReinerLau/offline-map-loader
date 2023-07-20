<script setup lang="ts">
import { useOfflineMap } from 'use-offline-map'

const center = [(113.157014 + 113.69204200000001) / 2, (22.20103800000001 + 22.772601999999978) / 2]
const { UseOFFlineMap } = useOfflineMap(
  { center, zoom: 11, maxZoom: 11, minZoom: 11 },
  { limitExtend: true, showGrid: true }
)
</script>

<template>
  <UseOFFlineMap></UseOFFlineMap>
</template>
