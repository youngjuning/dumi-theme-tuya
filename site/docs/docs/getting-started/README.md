---
group:
  title: 介绍
  order: 1

toc: false

nav:
  title: 文档

title: 快速上手
---

<center><p align="center"><img src="https://images.tuyacn.com/rms-static/3dec3ee0-b3d9-11eb-9adb-1b12f902f79d-1620903119310.png?tyName=210513tuya.png" width="200px" /></p></center>

<center><h1>@tuya/dumi-theme-tuya</h1></center>

<center><p align="center">Tuya组件文档主题</p></center>

<center><p align="center">
  <a href="https://www.npmjs.com/package/@tuya/dumi-theme-tuya" target="_blank">
    <img src="https://img.shields.io/npm/v/@tuya/dumi-theme-tuya/latest.svg" />
  </a>&nbsp;
</p>
</center>

### 特性

- 基于 dumi 约定式 markdown 路由
- 只需要编写 markdown 即可生成文档站点！
- 提供 demo 分离部署接入

### 谁在使用？

- [Tuya Design 组件文档](https://github.com/TuyaInc/tuya-panel-kit-docs)

### 安装

1. 创建 dumi 应用

```shell
yarn create @umijs/dumi-app
```

2. 安装 Tuya 主题

```shell
yarn add @tuya/dumi-theme-tuya
```

3. 配置多语言标识符

```ts
import { defineConfig, IConfig } from 'dumi';

export default defineConfig({
  // ...省略其他配置
  // 多语言标识符（推荐使用 zh、en）
  locales: [
    ['zh', '中文'],
    ['en', 'English'],
  ],
} as IConfig);
```

4. 在 docs 目录下编写 markdown，示例目录结构：

```txt
docs
├── config                        # 顶部导航 - 配置
│   ├── README.en.md
│   └── README.md
├── docs                          # 顶部导航 - 文档
│   ├── exports                   # 文档 - 侧边菜单 - 内置组件
│   │   ├── add-404.en.md
│   │   └── add-404.md
│   ├── getting-started           # 文档 - 侧边菜单 - 介绍
│   │   ├── README.en.md
│   │   ├── README.md
│   │   ├── how-works.en.md
│   │   └── how-works.md
│   └── usage                     # 文档 - 侧边菜单 - 基础使用
│       ├── front-matter.en.md
│       └── front-matter.md
├── index.en.md                   # 首页 en
└── index.md                      # 首页 zh
```

5. 启动调试～

```shell
yarn start
```

6. 打包部署

```shell
yarn build
```

然后将dist目录拿去部署就好了