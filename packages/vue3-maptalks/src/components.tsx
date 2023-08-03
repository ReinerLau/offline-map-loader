import * as maptalks from "maptalks";
import { PropType, Ref, defineComponent, onMounted, ref } from "vue";

type AddMarker = (
  coordinates: maptalks.Coordinate | number[],
  options?: maptalks.MarkerOptions
) => void;
export interface MapLoaderInstance extends InstanceType<typeof MapLoader> {
  addMarker: AddMarker;
}

export const MapLoader = defineComponent({
  props: {
    maptalksOptions: {
      type: Object as PropType<maptalks.MapOptions>,
      required: true,
    },
  },
  setup(props, { expose }) {
    const mapRef: Ref<HTMLElement | undefined> = ref();
    let map: maptalks.Map;
    let layer: maptalks.VectorLayer;

    function initMap() {
      map = new maptalks.Map(mapRef.value as HTMLElement, {
        baseLayer: new maptalks.TileLayer("base", {
          urlTemplate: "/tiles/{z}/{x}/{y}.png",
        }),
        ...props.maptalksOptions,
      });
      layer = new maptalks.VectorLayer("vector");
      layer.addTo(map);
    }

    onMounted(() => {
      initMap();
    });

    const addMarker: AddMarker = (coordinates, options) => {
      const point = new maptalks.Marker(coordinates, options);
      layer.addGeometry(point);

      return point;
    };

    expose({
      addMarker,
    });

    return () => <div style="height:100%" ref={mapRef}></div>;
  },
});
