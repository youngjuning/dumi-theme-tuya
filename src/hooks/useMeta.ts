import { context } from 'dumi/theme';
import { useContext } from 'react';

import { IThemeContext } from '@umijs/preset-dumi/lib/theme/context';

export type TuyaThemeMeta = IThemeContext['meta'] & {
  desc?: string;
  demo?: string;
  [k: string]: any;
};

export const useMeta = () => {
  const { meta } = useContext(context);
  return meta as TuyaThemeMeta;
};
