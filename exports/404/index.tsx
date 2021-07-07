import './index.less';

import React, { useContext } from 'react';

import { context, NavLink } from '@umijs/preset-dumi/lib/theme';

export const NotFound = () => {
  const { locale } = useContext(context);
  const isCN = !/en/.test(locale);
  const home = isCN ? '/' : '/en';
  return (
    <div className="layout404">
      <div className="layout404-bg" />
      <div className="layout404-content">
        <div className="layout404-content-title">
          {isCN ? '找不到页面！' : "Can't find page!"}
        </div>
        <div className="layout404-content-subTitle">
          {isCN ? (
            <>
              抱歉！您访问的页面不存在 <NavLink to={home}>回到首页</NavLink>
            </>
          ) : (
            <>
              I'm sorry! The page you visited does not exist{' '}
              <NavLink to={home}>Back to the home page</NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
