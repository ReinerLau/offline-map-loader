import * as maptalks from "maptalks";
import { PropType } from "vue";
type AddMarker = (coordinates: maptalks.Coordinate | number[], options?: maptalks.MarkerOptions) => void;
export interface MapLoaderInstance extends InstanceType<typeof MapLoader> {
    addMarker: AddMarker;
}
export declare const MapLoader: import("vue").DefineComponent<{
    maptalksOptions: {
        type: PropType<maptalks.MapOptions>;
        required: true;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    maptalksOptions: {
        type: PropType<maptalks.MapOptions>;
        required: true;
    };
}>>, {}, {}>;
export {};
