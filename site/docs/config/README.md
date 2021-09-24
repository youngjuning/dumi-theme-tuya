---
title: themeConfig 配置
nav:
  title: 配置
toc: menu
---

以下为 themeConfig 扩展的配置项，更多配置项请参考 https://umijs.org/zh-CN/config

示例：

```ts
import { defineConfig, IConfig } from 'dumi';

export default defineConfig({
  // ...省略其他配置
  themeConfig: {
    qrcode:
      'tuyaSmart--addVirtualDev?productId=mvhcrizelobov3dw&token=release_common_component',
    apiData:
      'https://cdn.jsdelivr.net/npm/tuya-panel-kit-props-data/props.json',
    demoUrl: 'https://tuyainc.github.io/tuya-panel-kit-example/',
  },
} as IConfig);
```

## qrcode

接入 demo 展示时，虚拟手机底部展示的二维码 url

<img width="30%" src="https://images.tuyacn.com/rms-static/3dde7690-def7-11eb-bb1c-dd1a7461f245-1625643904121.webp?tyName=20210707device-qrcode.webp" />

## apiData

渲染属性说明的 API 标签所使用的数据源，API 标签使用示例：

```tsx
// 渲染 BrickButton 组件的属性说明
<API name="BrickButtonProps"></API>
```

<img width="60%" src="https://images.tuyacn.com/rms-static/de4fc430-def7-11eb-bb1c-dd1a7461f245-1625644173299.webp?tyName=20210707api-table.webp">

## demoUrl

demo 的部署地址

## demoInfoUrl

demo右下角链接，支持demo参数，格式如下：

```ts
import { defineConfig, IConfig } from 'dumi';

export default defineConfig({
  // ...省略其他配置
  themeConfig: {
    // {demo}会被替换成当前demo path
    demoInfoUrl: 'https://github.com/tuya/tuya-panel-kit/tree/master/example/src/pages{demo}/index.tsx'
  },
} as IConfig);
```

## repository

部署在github上时可以设置显示底部“在 GitHub 上编辑此页”，示例：

```ts
import { defineConfig, IConfig } from 'dumi';

export default defineConfig({
  // ...省略其他配置
  themeConfig: {
   repository: {
      url: 'https://github.com/youngjuning/dumi-theme-tuya',// github仓库地址
      branch: 'master',// 分支
      platform: 'github', // github | gitlab
      // dir: '/site' // 目录，在github仓库中的子文件夹
    },
  },
} as IConfig);
```

## fixLocales

修复locales和path冲突问题(开启此特性会降低体验)

```ts
import { defineConfig, IConfig } from 'dumi';

export default defineConfig({
  // ...省略其他配置
  themeConfig: {
    fixLocales: true
  },
} as IConfig);
```