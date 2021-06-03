import { createContext } from 'react';

import { IMenuItem } from '@umijs/preset-dumi/lib/routes/getMenuFromRoutes';

export type GetKeys<T, Filter = any> = {
  [P in keyof T]: T[P] extends Filter ? P : never;
}[keyof T];

export type WriteAbleKeys = GetKeys<CodeCtxType, string | string[]>;

export type WriteAbleCtx<T extends WriteAbleKeys = WriteAbleKeys> = {
  [K in T]: CodeCtxType[K];
};

export type CodeCtxType = {
  themes: string[];
  currentTheme: string;
  apiData: any;
  linkMap: { [key: string]: IMenuItem };
  update: (arg: Partial<WriteAbleCtx>) => void;
};

export const CodeContext = createContext<CodeCtxType>({
  themes: [],
  currentTheme: null,
  apiData: {},
  linkMap: {},
  update: ({ }) => { },
});

export type IFProps = {
  theme: string;
  children: string;
};
