import axios from "axios";
import ElementPlus, {
  ElButton,
  ElMessage,
  ElTreeV2,
  ElUpload,
} from "element-plus";
import sheet from "element-plus/dist/index.css" assert { type: "css" };
import { createApp, h, onMounted, ref } from "vue";
document.adoptedStyleSheets = [sheet];

createApp({
  setup() {
    const data = ref([]);
    const loading = ref(false);
    onMounted(() => {
      axios.get("/list").then((res) => {
        console.log(res.data);
        data.value = res.data;
      });
    });
    const UploadButton = () =>
      h(
        ElUpload,
        {
          action: "/upload",
          accept: ".zip",
          name: "tiles",
          showFileList: false,
          onProgress: () => {
            loading.value = true;
          },
          onSuccess: () => {
            loading.value = false;
            ElMessage({ type: "success", message: "上传成功" });
          },
          onError: () => {
            loading.value = false;
            ElMessage({ type: "error", message: "上传失败" });
          },
        },
        [h(ElButton, { type: "primary", loading: loading.value }, "上传压缩包")]
      );
    const Tree = () => h(ElTreeV2, { data: data.value, height: 200 });
    return () => h("div", [UploadButton(), Tree()]);
  },
})
  .use(ElementPlus)
  .mount("#app");
