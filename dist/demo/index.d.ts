import DomInspector from "../src/index";
declare global {
    interface Window {
        inspector: DomInspector;
    }
}
