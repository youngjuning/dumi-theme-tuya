---
nav:
  title: 配置
toc: menu
---

# themeConfig 配置

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
