---
nav:
  title: Config
toc: menu
---

# themeConfig

The following are the configuration items of the Theme Config extension. Please refer to more configuration items https://umijs.org/zh-CN/config

example:

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

When accessing the demo display, the QR code URL displayed at the bottom of the virtual phone

<img width="30%" src="https://images.tuyacn.com/rms-static/8ade6090-def7-11eb-bb1c-dd1a7461f245-1625644033305.webp?tyName=20210707device-qrcode-en.webp" />

## apiData

Render attributes indicate the data source used by the API tag. Examples of API tag use:

```tsx
// Render the properties of the Brick Button component
<API name="BrickButtonProps"></API>
```

<img width="60%" src="https://images.tuyacn.com/rms-static/de4fc430-def7-11eb-bb1c-dd1a7461f245-1625644173299.webp?tyName=20210707api-table.webp">

## demoUrl

The deployment address of the demo.
