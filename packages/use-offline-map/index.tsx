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
  function initMap() {
    map = new maptalks.Map(mapRef.value as HTMLElement, {
      baseLayer: new maptalks.TileLayer("base", {
        urlTemplate: "/tiles/{z}/{x}/{y}.png",
      }),
      ...initMapOption,
    });
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
  };
};
