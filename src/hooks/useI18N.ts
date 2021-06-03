import { context } from 'dumi/theme';
import { useContext } from 'react';

export type I18NProps = {
  [key: string]: {
    zh: string;
    en: string;
  };
};

export const useI18N = <T extends I18NProps>(options: T) => {
  const { locale } = useContext(context);
  const isCN = locale && /^zh|cn$/i.test(locale);
  return (key: keyof T) => options[key][isCN ? 'zh' : 'en'];
};
