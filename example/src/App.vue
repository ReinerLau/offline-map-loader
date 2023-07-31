<script setup lang="ts">
import { OfflineMap } from 'rl-offline-map-test'
import { ref, type Ref } from 'vue'

const x = (113.157014 + 113.69204200000001) / 2
const y = (22.20103800000001 + 22.772601999999978) / 2
const center: Ref<[number, number]> = ref([x, y])
</script>

<template>
  <OfflineMap :center="center" :zoom="11"></OfflineMap>
</template>
