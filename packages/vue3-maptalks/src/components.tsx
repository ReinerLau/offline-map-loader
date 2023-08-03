import * as maptalks from "maptalks";
import { PropType, Ref, defineComponent, onMounted, ref } from "vue";

export const MapLoader = defineComponent({
  props: {
    maptalksOptions: {
      type: Object as PropType<maptalks.MapOptions>,
      required: true,
    },
  },
  setup(props) {
    const mapRef: Ref<HTMLElement | undefined> = ref();

    function initMap() {
      new maptalks.Map(mapRef.value as HTMLElement, {
        baseLayer: new maptalks.TileLayer("base", {
          urlTemplate: "/tiles/{z}/{x}/{y}.png",
        }),
        ...props.maptalksOptions,
      });
    }

    onMounted(() => {
      initMap();
    });

    return () => <div style="height:100%" ref={mapRef}></div>;
  },
});
