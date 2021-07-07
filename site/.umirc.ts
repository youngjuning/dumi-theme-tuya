import { defineConfig, IConfig } from 'dumi';

const isProd =
  process.env.NODE_ENV === 'production' && process.env.PREVIEW_PR !== 'true';

export default defineConfig({
  ssr: isProd ? {} : false,
  exportStatic: isProd ? {} : false,
  title: 'Tuya Theme',
  mode: 'site',
  locales: [
    ['zh', '中文'],
    ['en', 'English'],
  ],
  favicon:
    'https://imagesd.tuyaus.com/tyims/rms-static/c118f100-7bd1-11ea-be8a-afe9921c3d8a-1586595140625.ico?tyName=tuya_favicon.ico',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
  theme: {
    'primary-color': '#ff4800',
  },
  logo:
    'https://imagesd.tuyaus.com/tyims/rms-static/c118f100-7bd1-11ea-be8a-afe9921c3d8a-1586595140625.ico?tyName=tuya_favicon.ico',
  navs: {
    zh: [
      null,
      {
        title: 'Github',
        path: 'https://github.com/youngjuning/dumi-theme-tuya',
      },
    ],
    en: [
      null,
      {
        title: 'Github',
        path: 'https://github.com/youngjuning/dumi-theme-tuya',
      },
    ],
  },
  resolve: {
    passivePreview: true,
  },
  hash: isProd,
  // base: isProd ? '/tuya-panel-kit-docs' : '/', // router base
  publicPath: isProd
    ? '//cdn.jsdelivr.net/gh/TuyaInc/tuya-panel-kit-docs@gh-pages/'
    : '/',
} as IConfig);
