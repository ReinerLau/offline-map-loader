import * as maptalks from "maptalks";
// import "maptalks/dist/maptalks.css";
import { PropType, Ref, defineComponent, onMounted, ref } from "vue";

export const OfflineMap = defineComponent({
  props: {
    center: { type: Object as PropType<[number, number]>, default: [0, 0] },
    zoom: { type: Number, default: 1 },
  },
  setup(props) {
    const mapRef: Ref<HTMLElement | undefined> = ref();

    function initMap() {
      new maptalks.Map(mapRef.value as HTMLElement, {
        baseLayer: new maptalks.TileLayer("base", {
          urlTemplate: "/tiles/{z}/{x}/{y}.png",
        }),
        center: props.center,
        zoom: props.zoom,
      });
    }

    onMounted(() => {
      initMap();
    });

    return () => <div style="height:100%" ref={mapRef}></div>;
  },
});
