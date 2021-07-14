import { createContext } from 'react';

import { IMenuItem } from '@umijs/preset-dumi/lib/routes/getMenuFromRoutes';

export type FilterKeys<T, Filter = any> = {
  [P in keyof T]: P extends Filter ? never : P;
}[keyof T];

export type WriteAbleKeys = FilterKeys<CodeCtxType, 'update' | 'linkMap'>;

export type WriteAbleCtx<T extends WriteAbleKeys = WriteAbleKeys> = {
  [K in T]: CodeCtxType[K];
};

export type CodeCtxType = {
  update: (arg: Partial<WriteAbleCtx>) => void;
  linkMap: { [key: string]: IMenuItem };
  apiData: any;
  // theme
  themes: string[];
  currentTheme: string;
  // desc
  desc?: any
  descHideTitle?: 'true' | 'false'
};

export const CodeContext = createContext<Partial<CodeCtxType>>({
  themes: [],
  currentTheme: null,
  apiData: {},
  linkMap: {},
  update: ({ }) => { },
  descHideTitle: 'false'
});

export type IFProps = {
  theme: string;
  children: string;
};
