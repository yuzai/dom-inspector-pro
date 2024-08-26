window.inspector = new DomInspector.default({
    maxZIndex: 9999,
    onMoveSelect: (target) => {
        console.log(target);
    },
    onDidSelect: (target) => {
        console.log(target);
        window.inspector.pause();
    }
});
