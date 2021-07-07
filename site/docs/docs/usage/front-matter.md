---
group:
  title: 基础使用
  order: 3

title: Markdown顶部meta配置
---

## Meta 配置

Markdown 文件顶部两个---中间的内容（FrontMatter）为 meta 信息，按照 YAML 语法格式编写，dumi 约定了一些配置：

```txt
---
title: 自定义页面名称
nav:
  path: /自定义导航路由
  title: 自定义导航名称
  order: 控制导航顺序，数字越小越靠前，默认以路径长度和字典序排序
group:
  path: /自定义分组路由，注意，分组路由 = 导航路由 + 自己
  title: 自定义分组名称
  order: 控制分组顺序，数字越小越靠前，默认以路径长度和字典序排序
---

<!-- 其他 Markdown 内容 -->
```

更多配置项请参考 https://d.umijs.org/zh-CN/config/frontmatter

## Meta 扩展

本主题对 dumi 约定的 meta 进行了扩展：

1. demo

```txt
---
title: Battery 电池
desc: '`Battery` 是电池组件，一般用于需要展示电池百分比的场景。'
demo: /basic/battery
---
```

demo 配置的值用来告诉 demoUrl 加载的路由 path，会通过 postMessage 发送给 demo。
