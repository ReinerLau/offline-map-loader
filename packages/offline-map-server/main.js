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
      getData();
    });

    async function getData() {
      const res = await axios.get("/list");
      data.value = res.data;
    }

    async function handleDelete(id) {
      try {
        const res = await axios.delete(`/delete/${id}`);
        ElMessage({ type: "success", message: res.data });
        getData();
      } catch (err) {
        ElMessage({ type: "error", message: err.response.data });
      }
    }

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
            getData();
          },
          onError: () => {
            loading.value = false;
            ElMessage({ type: "error", message: "上传失败" });
          },
        },
        [h(ElButton, { type: "primary", loading: loading.value }, "上传压缩包")]
      );
    const Tree = () =>
      h(
        ElTreeV2,
        { data: data.value, height: window.innerHeight - 100 },
        {
          default: ({ node }) =>
            h(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              },
              [
                h("span", node.label),
                h(
                  ElButton,
                  {
                    link: true,
                    type: "primary",
                    onClick: () => handleDelete(node.key),
                  },
                  "删除"
                ),
              ]
            ),
        }
      );
    return () => h("div", [UploadButton(), Tree()]);
  },
})
  .use(ElementPlus)
  .mount("#app");
