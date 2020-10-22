---
title: '编辑器'
index: 3
---

## 编辑器

`docbook` 支持编辑器，语法如下：

<img width="50%" src="./syntx.png" alt="语法" />

渲染：

:::demo

```html
<div id="app">{{ message }}</div>
```

```css
#app {
  color: red;
}
```

```javascript
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
  },
});
```

:::
