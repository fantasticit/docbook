---
title: '文档撰写'
index: 2
---

## 文档撰写

`docbook` 支持 `.vue` 和 `.md` 两种格式文档。支持属性如下：

- `title`: 文件名称配置，字符串
- `index`: 文件索引，数字

### `.vue` 格式

在 vue 文件 `script` 部分添加 `title` 和 `index` 属性配置形如：

```vue
<template></template>

<script>
export default {
  title: '文档',
  index: 0,
};
</script>

<style lang="scss" scoped></style>
```

### `.md` 格式

在 md 文件中添加 `title` 和 `index` 属性配置形如：

```md
---
title: '文档'
index: 1
---

<!-- 以下为正文 -->
```
