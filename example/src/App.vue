<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { MapLoader } from 'vue3-maptalks'

const x = (113.157014 + 113.69204200000001) / 2
const y = (22.20103800000001 + 22.772601999999978) / 2
const center: Ref<[number, number]> = ref([x, y])
</script>

<template>
  <MapLoader :maptalks-options="{ center, zoom: 11 }"></MapLoader>
</template>
