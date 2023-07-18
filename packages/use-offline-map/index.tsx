import * as maptalks from "maptalks";
import "maptalks/dist/maptalks.css";
import { FunctionalComponent, Ref, onMounted, ref } from "vue";

export const useOfflineMap = () => {
  function initMap() {
    new maptalks.Map(mapRef.value as HTMLElement, {
      center: [
        (113.157014 + 113.69204200000001) / 2,
        (22.20103800000001 + 22.772601999999978) / 2,
      ],
      zoom: 11,
      minZoom: 11,
      maxZoom: 11,
      baseLayer: new maptalks.TileLayer("base", {
        urlTemplate: "/tiles/{z}/{x}/{y}.png",
      }),
    });
  }
  onMounted(initMap);
  const mapRef: Ref<HTMLElement | undefined> = ref();
  const UseOFFlineMap: FunctionalComponent = () => (
    <div style="height:100%" ref={mapRef}></div>
  );
  return {
    UseOFFlineMap,
  };
};
