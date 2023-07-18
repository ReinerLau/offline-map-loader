import * as maptalks from "maptalks";
import "maptalks/dist/maptalks.css";
import { Ref, onMounted, ref } from "vue";

export const useOfflineMap = () => {
  function initMap() {
    new maptalks.Map(mapRef.value as HTMLElement, {
      center: [0, 0],
      zoom: 2,
      baseLayer: new maptalks.TileLayer("base", {
        urlTemplate:
          "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        subdomains: ["a", "b", "c", "d"],
        attribution:
          '&copy; <a href="http://www.osm.org/copyright">OSM</a> contributors, ' +
          '&copy; <a href="https://carto.com/attributions">CARTO</a>',
      }),
    });
  }
  onMounted(initMap);
  const mapRef: Ref<HTMLElement | undefined> = ref();
  const UseOFFlineMap = () => <div style="height:100%" ref={mapRef}></div>;
  return {
    UseOFFlineMap,
  };
};
