import DomInspector from "../src/index";

declare global {
    interface Window {
        inspector: DomInspector;
    }
} 

window.inspector = new DomInspector({
    maxZIndex: 9999,
    onMoveSelect: (target) => {
        console.log(target);
    },
    onDidSelect: (target) => {
        console.log(target);
        window.inspector.pause();
    }
});
