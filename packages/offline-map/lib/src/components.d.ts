import { PropType } from "vue";
export declare const OfflineMap: import("vue").DefineComponent<{
    center: {
        type: PropType<[number, number]>;
        default: number[];
    };
    zoom: {
        type: NumberConstructor;
        default: number;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    center: {
        type: PropType<[number, number]>;
        default: number[];
    };
    zoom: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    center: [number, number];
    zoom: number;
}, {}>;
