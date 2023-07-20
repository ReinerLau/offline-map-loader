import * as maptalks from "maptalks";
import "maptalks/dist/maptalks.css";
import { FunctionalComponent, Ref, onMounted, ref } from "vue";

interface Options {
  limitExtend?: boolean;
  showGrid?: boolean;
}

export const useOfflineMap = (
  initMapOption: maptalks.MapOptions,
  options?: Options
) => {
  let map: maptalks.Map;
  let layer: maptalks.VectorLayer;
  function initMap() {
    map = new maptalks.Map(mapRef.value as HTMLElement, {
      baseLayer: new maptalks.TileLayer("base", {
        urlTemplate: "/tiles/{z}/{x}/{y}.png",
      }),
      ...initMapOption,
    });
    layer = new maptalks.VectorLayer("layer").addTo(map);
  }

  function getMapInstance() {
    return map;
  }

  function handleLimitExtent() {
    const extent = map.getExtent();
    map.setMaxExtent(extent);
  }

  function handleShowGrid() {
    const baseLayer = map.getBaseLayer();
    baseLayer.config({ debug: true });
  }

  function addMark(x: number, y: number) {
    const coord = new maptalks.Coordinate({ x, y });
    const marker = new maptalks.Marker(coord);
    marker.addTo(layer);
  }

  onMounted(() => {
    initMap();
    options?.limitExtend && handleLimitExtent();
    options?.showGrid && handleShowGrid();
  });

  const mapRef: Ref<HTMLElement | undefined> = ref();
  const UseOFFlineMap: FunctionalComponent = () => (
    <div style="height:100%" ref={mapRef}></div>
  );
  return {
    UseOFFlineMap,
    getMapInstance,
    addMark,
  };
};
