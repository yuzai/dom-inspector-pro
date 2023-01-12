dom-inspector-pro
--------------------------------

Dom inspector like chrome dev tools。

可视化埋点的基础能力---元素圈选器

一部分代码参考自 [dom-inspector](https://github.com/luoye-fe/dom-inspector#readme), 但是对很多功能均进行了增强：

1. 增加了例如 onMoveSelect, onDidSelect 这样的回调函数，从而可以有更多的时机来完成元素圈选的逻辑相关逻辑
2. 增加了对 svg ，对 transform: scale 后的元素的支持
3. 增加了 selectTarget, selectTargets 这样的 api, 来给使用者自行完成元素圈选
4. 增加了 移动端选择的 能力
5. 增加了 列表元素的 判断及选择能力

故称为 dom-inspector-pro.

使用 demo 可以查看这个[例子](https://blog.maxiaobo.com.cn/dom-inspector-pro/demo/index.html)。演示了 多选、svg 元素、transform 等边界场景的支持。

移动端也可直接扫码体验：

![img](https://tva1.sinaimg.cn/large/008vxvgGly1h95hsdv1l9j307f07ejrs.jpg)

## 使用方法

### 安装 `dom-inspector-pro`

```bash
npm install dom-inspector-pro --save
```

script 使用

```html
<script type="text/javascript" src="./dist/index.js"></script>
```

npm 包使用

```js
const DomInspector = require('dom-inspector-pro');
```

```js
import DomInspector from 'dom-inspector-pro';
```

### 实例化

```js
const inspector = new DomInspector();
```

### 实例化选项

```js
const inspector = new DomInspector({
    theme: '', // 可选，主题，不建议更改，内部主题色参考 chrome 已经设置好
    onMoveSelect: (target) => {
        // 用户在移动过程中选择元素的回调
        console.log(target);
    }, // 可选
    onDidSelect: (target) => {
        // 用户在移动过程中，选择了元素，并进行了点击，此时会触发该回调
        // 实际的使用场景中，可以用来进行关闭 or 暂停选择器等操作
        console.log(target);
        inspector.pause();
    }, // 可选
    maxZIndex: 9999, // 可选，max z index, if blank, will auto get document.all max z index
    env: 'pc' | 'mobile', // 可选, 如果不填，则内部会根据浏览器 ua 进行移动端 or pc 端的判断
    mode: 'single' | 'multi' // 可选, 开启多选 or 单选，如果是多选模式，则会在选中元素时，检测该元素是否处于列表中，如果是，则会全选多个元素
});
```

### 启动、暂停与关闭

```js
const inspector = new DomInspector();

inspector.enable();

inspector.disable();

inspector.pause();
```

### 内部属性及方法

```ts
class DomInspector {
    theme: string;
    maxZIndex: number;
    mode: 'single' | 'multi';
    env: 'pc' | 'mobile';
    xpath: string | null;
    target: Target;
    status: 'enable' | 'disable' | 'pause';
    constructor(options: {
        theme?: string;
        maxZIndex?: number;
        mode?: 'single' | 'multi';
        env?: 'pc' | 'mobile';
        onMoveSelect?: (target: Target) => void;
        onDidSelect?: (target: Target) => void;
    });
    enable(mode?: 'single' | 'multi'): null;
    pause(): void;
    disable(): void;
    selectTarget(ele: HTMLElement): void;
    selectTargets(eles: HTMLElement[]): void;
    private _addBodyClick;
    private onMoveSelect;
    private onDidSelect;
    private assistEle;
    private _cachedTarget;
    private event;
    private overlay;
    private _throttleOnMove;
    private _remove;
    private _onMove;
    private _onMoveEnd;
}
```

实际使用中，对于期望在用户移动期间执行的 回调，可以通过 **onMoveSelect** 传入，对于期望用户在选中后并点击后执行的逻辑，可以通过 **onDidSelect** 传入，在可视化圈选中，一般在这个回调中，关闭圈选器，并唤起表单等供用户录入信息。

而如果想要直接选择元素而非借助用户移动鼠标，可以调用 **selectTarget** 及 **selectTargets** 方法去一次行选择单个 or 多个元素。

这几个 api 也是 dom-inspector 中被要求追加的功能，在可视化埋点中也是不可获取的功能，故 本工程实现了这些方法。

### 其他工具方法

在可视化埋点中，还有一些必备的工具方法，比如： 获取元素的 xpath，检测列表元素等等，本项目也对这些工具方法进行了抛出，可自行查看 ts 定义选择使用

### iframe 中使用

本库并不能直接在 iframe 中使用，不过可以作为一个环节来在 iframe 中使用，方案如下：

iframe 中的页面 接入 inspector 脚本，同时注入一段 iframe 通信的脚本。

在主页面中，通过发送 指令，操控 inspector 来完成圈选， inspector 圈选结束后，向主页面发送消息，在主页面对 target 进行操控，从而完成 iframe 中使用的流程，具体可以参考文章 [可视化埋点（一）：从0到1搭建可视化埋点平台](https://blog.maxiaobo.com.cn/2022/09/03/%E5%8F%AF%E8%A7%86%E5%8C%96%E5%9F%8B%E7%82%B9%EF%BC%88%E4%B8%80%EF%BC%89%EF%BC%9A%E4%BB%8E0%E5%88%B01%E6%90%AD%E5%BB%BA%E5%8F%AF%E8%A7%86%E5%8C%96%E5%9F%8B%E7%82%B9%E5%B9%B3%E5%8F%B0/)
