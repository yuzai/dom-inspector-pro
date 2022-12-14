export declare function mixin(target: {
    [key: string]: any;
}, source: {
    [key: string]: any;
}): {
    [key: string]: any;
};
export declare function throttle(func: (...args: any) => any, wait?: number): (this: any, ...args: any) => void;
export declare function isNull(obj: any): boolean;
export declare const svgTags: string[];
export declare const ignoreTags: string[];
export declare const getTagName: (ele: HTMLElement) => string;
export declare function getMax(arrOrObj: {
    [key: string | number]: any;
}): number;
export declare function judgeNums({ num, total, min, ratio, }: {
    num: number;
    total: number;
    min?: number;
    ratio?: number;
}): boolean;
export declare function touchAction(enable?: boolean): void;
