import { context } from 'dumi/theme';
import { Location } from 'history-with-query';
import { useContext } from 'react';

import { useThemeConfig } from './useThemeConfig';

export const useCondition = (
  condition: 'isCN' | 'isHome' | 'showSideMenu' | 'showSlugs' | 'showDevice',
  location: Location,
) => {
  const { meta, locale } = useContext(context);
  const hasDemo = !!meta?.demo;
  const { demoUrl } = useThemeConfig();

  if (condition === 'isCN') {
    return locale && /^zh|cn$/i.test(locale);
  }

  const isHome = location?.pathname.replace(locale, '') === '/';
  if (condition === 'isHome') {
    return isHome;
  }

  if (condition === 'showSideMenu') {
    const showSideMenu = meta.sidemenu !== false && !isHome && !meta.gapless;
    return showSideMenu;
  }

  let showDevice = !!(hasDemo && demoUrl);
  if (condition === 'showDevice') {
    return showDevice;
  }

  if (condition === 'showSlugs') {
    if (isHome) {
      return false;
    }
    if (showDevice) {
      return false;
    }
    const showSlugs =
      Boolean(meta.slugs?.length) &&
      (meta.toc === 'content' || meta.toc === undefined) &&
      !meta.gapless;
    return showSlugs;
  }
};
