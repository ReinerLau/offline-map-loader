此组件诞生于需要加载离线地图的项目

- 基于 vue3 组合式 API
- 使用 TypeScript 编写
- 基于 maptalks 封装

## 开始

### 安装

```bash
npm i vue3-maptalks --save
```

### 使用

`maptalks-options` 可选属性来自于 [maptalks 官方文档](https://maptalks.org/maptalks.js/api/1.x/Map.html)

```vue
<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import { MapLoader, type MapLoaderInstance } from "vue3-maptalks";

const center: Ref<[number, number]> = ref([0, 0]);
</script>

<template>
  <MapLoader ref="mapRef" :maptalks-options="{ center, zoom: 1 }"></MapLoader>
</template>
```

### 离线地图

需要结合离线地图下载工具和部署[静态瓦片托管服务](https://github.com/ReinerLau/offline-map-loader/tree/master/packages/offline-map-server)一整套解决方案来使用，目前兼容高德、腾讯、百度

## 交流

欢迎添加微信（reinerlau）交流
