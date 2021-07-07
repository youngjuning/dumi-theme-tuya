---
title: FAQ进阶
---

## 如何实现 API 标签渲染组件属性说明表格？

...

## 如何实现与 demo 路由同步？

浏览组件文档页面时，文档会使用 postMessage 将文档 meta 中的 demo 字段发送给 demo iframe。同样的，浏览 demo 页面时，demo 会使用 postMessage 将路由 hash 发送给文档。
