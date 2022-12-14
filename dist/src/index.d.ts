import './style.css';
type Target = HTMLElement | EventTarget | '' | null;
declare class DomInspector {
    theme: string;
    maxZIndex: number;
    mode: 'single' | 'multi';
    env: 'pc' | 'mobile';
    xpath: string | null;
    target: Target;
    status: 'enable' | 'disable' | 'pause';
    onMoveSelect: (target: Target) => void;
    onDidSelect: (target: Target) => void;
    private assistEle;
    private _cachedTarget;
    private event;
    private overlay;
    private _throttleOnMove;
    constructor(options: {
        theme?: string;
        maxZIndex?: number;
        mode?: 'single' | 'multi';
        env?: 'pc' | 'mobile';
        onMoveSelect?: (target: Target) => void;
        onDidSelect?: (target: Target) => void;
    });
    private _addBodyClick;
    enable(mode?: 'single' | 'multi'): null;
    pause(): void;
    disable(): void;
    selectTarget(ele: HTMLElement): void;
    selectTargets(eles: HTMLElement[]): void;
    private _remove;
    private _onMove;
    private _onMoveEnd;
}
export default DomInspector;
