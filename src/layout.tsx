import './style/layout.less';

import axios from 'axios';
import { context } from 'dumi/theme';
import React, {
    CSSProperties, useContext, useEffect, useLayoutEffect, useMemo, useState
} from 'react';

import { IRouteComponentProps } from '@umijs/types';

import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import SideMenu from './components/SideMenu';
import SlugsList from './components/SlugList';
import { CodeContext, CodeCtxType } from './context';
import { useCondition, useHandlePostPath, useLinkMap } from './hooks';
import { Renderer } from './pages';
import { Home } from './pages/home';

const Layout: React.FC<IRouteComponentProps> = ({ children, location }) => {
  const {
    config: {
      mode,
      theme: { apiData },
    },
    meta,
  } = useContext(context);
  const isHome = useCondition('isHome', location);
  const showSideMenu = useCondition('showSideMenu', location);
  const showSlugs = useCondition('showSlugs', location);

  const [menuCollapsed, setMenuCollapsed] = useState<boolean>(true);

  const [ctxValues, setCtxValues] = useState<Partial<CodeCtxType>>({
    themes: [],
    currentTheme: null,
    apiData: null,
    desc: null,
  });

  // 这里重置desc
  // 使用layout effect优先级比Desc的effect高
  useLayoutEffect(() => {
    setCtxValues({ ...ctxValues, desc: null, descHideTitle: 'false' });
  }, [location.pathname]);

  const linkMap = useLinkMap();

  useEffect(() => {
    if (apiData && ctxValues.apiData === null) {
      axios
        .get(apiData)
        .then(res => setCtxValues({ ...ctxValues, apiData: res.data }));
    }
  }, [ctxValues]);

  useHandlePostPath();

  const layoutStyle = useMemo(() => {
    const style: CSSProperties = {
      paddingBottom: isHome ? 198 : 50,
      overflow: isHome ? 'hidden' : 'unset',
      backgroundSize: 'cover',
    };
    const background = meta?.hero?.background;
    if (background) {
      style.backgroundImage = `url(${background})`;
    }
    return style;
  }, [isHome, meta]);

  return (
    <CodeContext.Provider
      value={{
        ...ctxValues,
        linkMap,
        update: args => args && setCtxValues({ ...ctxValues, ...args }),
      }}
    >
      <div
        className="__dumi-default-layout"
        data-route={location.pathname}
        data-show-sidemenu={String(showSideMenu)}
        data-show-slugs={String(showSlugs)}
        data-site-mode={mode === 'site'}
        data-gapless={String(!!meta.gapless)}
        data-use-bg={isHome}
        onClick={() => {
          if (menuCollapsed) return;
          setMenuCollapsed(true);
        }}
        style={layoutStyle}
      >
        {/* 顶部导航渲染 */}
        <Navbar
          isHome={isHome}
          location={location}
          navPrefix={<SearchBar location={location} />}
          onMobileMenuClick={ev => {
            setMenuCollapsed(val => !val);
            ev.stopPropagation();
          }}
        />
        {showSlugs && (
          <SlugsList slugs={meta.slugs} className="__dumi-default-layout-toc" />
        )}
        {/* 侧边栏渲染 */}
        {showSideMenu && (
          <SideMenu mobileMenuCollapsed={menuCollapsed} location={location} />
        )}
        {/* 页面渲染 */}
        {isHome ? (
          <Home content={children} />
        ) : (
          <Renderer location={location} content={children} />
        )}
      </div>
    </CodeContext.Provider>
  );
};

export default Layout;
