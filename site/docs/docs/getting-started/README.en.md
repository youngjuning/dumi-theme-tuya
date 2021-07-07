---
group:
  title: Introduction
  order: 1

toc: false

nav:
  title: Docs

title: Getting Started
---

<center><p align="center"><img src="https://images.tuyacn.com/rms-static/3dec3ee0-b3d9-11eb-9adb-1b12f902f79d-1620903119310.png?tyName=210513tuya.png" width="200px" /></p></center>

<center><h1>@tuya/dumi-theme-tuya</h1></center>

<center><p align="center">Tuya component document theme</p></center>

<center><p align="center">
  <a href="https://www.npmjs.com/package/@tuya/dumi-theme-tuya" target="_blank">
    <img src="https://img.shields.io/npm/v/@tuya/dumi-theme-tuya/latest.svg" />
  </a>&nbsp;
</p>
</center>

### Features

- Markdown routing based on dumi contract form.
- Just write Markdown to generate a documentation site!
- Demo separated deployment access is provided.

### Who using?

- [Tuya Design](https://github.com/TuyaInc/tuya-panel-kit-docs)

### Install

1. create dumi app

```shell
yarn create @umijs/dumi-app
```

2. install tuya theme

```shell
yarn add @tuya/dumi-theme-tuya
```

3. Configure locale identifiers

```ts
import { defineConfig, IConfig } from 'dumi';

export default defineConfig({
  // ...Omit other configuration
  // locale keys（zh、en）
  locales: [
    ['zh', '中文'],
    ['en', 'English'],
  ],
} as IConfig);
```

4. Write Markdown in the docs directory. Example directory structure:

```txt
docs
├── config                          # Nav - Config
│   ├── README.en.md
│   └── README.md
├── docs                            # Nav - Docs
│   ├── exports                     # Docs - SideMenu - Exports
│   │   ├── add-404.en.md
│   │   └── add-404.md
│   ├── getting-started             # Docs - SideMenu - Introduction
│   │   ├── README.en.md
│   │   ├── README.md
│   │   ├── how-works.en.md
│   │   └── how-works.md
│   └── usage                       # Docs - SideMenu - Basic Usage
│       ├── front-matter.en.md
│       └── front-matter.md
├── index.en.md                     # Index en
└── index.md                        # Index zh
```

5. Start debugging～

```shell
yarn start
```

6. Build and deploy

```shell
yarn build
```

Then take the dist directory and deploy it