<script setup lang="ts">
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { find, flatMapDeep } from 'lodash'
import { computed, onMounted, ref, type Ref } from 'vue'

interface tileData {
  id: string
  label: string
  children: tileData[] | undefined
}

const data = ref([])
const loading = ref(false)
let flatData: tileData[] = []
const urlList: Ref<string[]> = ref([])

const height = computed(() => window.innerHeight - 100)

onMounted(() => {
  getData()
})

async function getData() {
  const res = await axios.get('/tiles')
  data.value = res.data
  flatData = getFileOrFolder(data.value)
}

async function handleDelete(id: string) {
  try {
    const res = await axios.delete(`/tiles/${id}`)
    ElMessage({ type: 'success', message: res.data.message })
    getData()
  } catch (err: any) {
    ElMessage({ type: 'error', message: err.response.data.message })
  }
}

const previewVisible = ref(false)
function handleTilePreview(id: string) {
  const res = find(flatData, { id })
  if (!res) return ElMessage({ type: 'error', message: '未找到瓦片数据' })
  const tiles = res.children
    ? getFileOrFolder(res.children).filter((item) => !item.children)
    : [res]
  urlList.value = tiles.map((item) => `/${item.id.replaceAll('_', '/')}`)
  previewVisible.value = true
}

function getFileOrFolder(data: tileData[]): tileData[] {
  return flatMapDeep(data, (item) => [item, item.children ? getFileOrFolder(item.children) : []])
}

function handleUploadSuccess(res: any) {
  loading.value = false
  ElMessage({ type: 'success', message: res.message })
  getData()
}

function handleUploadError(error: Error) {
  loading.value = false
  ElMessage({ type: 'error', message: error.message })
}
</script>

<template>
  <el-upload
    action="/tiles"
    accept=".zip"
    name="files"
    :show-file-list="false"
    @progress="() => (loading = true)"
    @success="handleUploadSuccess"
    @error="handleUploadError"
  >
    <el-button type="primary" :loading="loading">上传压缩包</el-button>
  </el-upload>
  <el-tree-v2 :data="data" :height="height" :expand-on-click-node="false">
    <template #default="{ node }">
      <div class="item-item">
        <span @click="() => handleTilePreview(node.key)">{{ node.label }}</span>
        <el-button link type="primary" @click="() => handleDelete(node.key)">删除</el-button>
      </div>
    </template>
  </el-tree-v2>
  <el-image-viewer
    v-if="previewVisible"
    :url-list="urlList"
    @close="() => (previewVisible = false)"
  ></el-image-viewer>
</template>

<style scoped>
.tree-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}
</style>
