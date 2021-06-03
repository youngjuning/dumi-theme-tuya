import './style/layout.less';

import axios from 'axios';
import { context } from 'dumi/theme';
import React, { useContext, useEffect, useState } from 'react';

import { IRouteComponentProps } from '@umijs/types';

import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import SideMenu from './components/SideMenu';
import SlugsList from './components/SlugList';
import { CodeContext, WriteAbleCtx } from './context';
import { useCondition, useLinkMap } from './hooks';
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

  const [ctxValues, setCtxValues] = useState<WriteAbleCtx>({
    themes: [],
    currentTheme: null,
    apiData: null,
  });

  const linkMap = useLinkMap();

  useEffect(() => {
    if (ctxValues.apiData === null) {
      axios
        .get(apiData)
        .then(res => setCtxValues({ ...ctxValues, apiData: res.data }));
    }
  }, [ctxValues]);

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
        data-use-bg={!!meta.background}
        onClick={() => {
          if (menuCollapsed) return;
          setMenuCollapsed(true);
        }}
        style={{
          backgroundImage: `url(${meta.background})`,
          paddingBottom: isHome ? 198 : 50,
          overflow: isHome ? 'hidden' : 'unset',
          backgroundSize: 'cover',
        }}
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
        {isHome ? <Home content={children} /> : <Renderer content={children} />}
      </div>
    </CodeContext.Provider>
  );
};

export default Layout;
