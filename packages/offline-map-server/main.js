import axios from "axios";
import ElementPlus, {
  ElButton,
  ElImageViewer,
  ElMessage,
  ElTreeV2,
  ElUpload,
} from "element-plus";
import sheet from "element-plus/dist/index.css" assert { type: "css" };
import { find, flatMapDeep } from "lodash";
import { createApp, h, onMounted, ref } from "vue";
document.adoptedStyleSheets = [sheet];

createApp({
  setup() {
    const data = ref([]);
    const loading = ref(false);
    let flatData = [];
    onMounted(() => {
      getData();
    });

    async function getData() {
      const res = await axios.get("/list");
      data.value = res.data;
      flatData = getFileOrFolder(data.value);
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

    const previewVisible = ref(false);
    function handleTilePreview(id) {
      const res = find(flatData, { id });
      const tiles = res.children
        ? getFileOrFolder(res.children).filter((item) => !item.children)
        : [res];
      urlList.value = tiles.map((item) => `/${item.id.replaceAll("_", "/")}`);
      previewVisible.value = true;
    }

    function getFileOrFolder(data) {
      return flatMapDeep(data, (item) => [
        item,
        item.children ? getFileOrFolder(item.children) : [],
      ]);
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
        {
          data: data.value,
          height: window.innerHeight - 100,
          expandOnClickNode: false,
        },
        {
          default: ({ node }) =>
            h(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  userSelect: "none",
                },
              },
              [
                h(
                  "span",
                  { onClick: () => handleTilePreview(node.key) },
                  node.label
                ),
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

    const urlList = ref([]);

    const TileViewer = () =>
      h(ElImageViewer, {
        urlList: urlList.value,
        onClose: () => (previewVisible.value = false),
      });

    return () =>
      h("div", [
        UploadButton(),
        Tree(),
        previewVisible.value ? TileViewer() : null,
      ]);
  },
})
  .use(ElementPlus)
  .mount("#app");
