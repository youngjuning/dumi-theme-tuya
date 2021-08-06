import './style.less';

import { context, Link } from 'dumi/theme';
import { Location } from 'history-with-query';
import React, { ReactNode, useContext, useEffect, useRef } from 'react';

import Device from '../../components/Device';
import { CodeContext } from '../../context';
import { useCondition } from '../../hooks';
import { useMeta } from '../../hooks/useMeta';
import { useThemeConfig } from '../../hooks/useThemeConfig';
import { transform } from '../../parser';
import { classnames } from '../../utils/classnames';
import { join } from '../../utils/join';

export interface RerenderProps {
  content: ReactNode;
  location: Location<{}>;
}

const Footer = ({ location }) => {
  const {
    meta,
    config: {
      theme: { repository },
    },
  } = useContext(context);

  const { url: repoUrl, branch, platform, dir = '' } = repository ?? {};
  const updatedTimeIns = new Date(meta.updatedTime);
  const updatedTime: any = `${updatedTimeIns.toLocaleDateString([], {
    hour12: false,
  })} ${updatedTimeIns.toLocaleTimeString([], { hour12: false })}`;
  const repoPlatform =
    { github: 'GitHub', gitlab: 'GitLab' }[
    (repoUrl || '').match(/(github|gitlab)/)?.[1] || 'nothing'
    ] || platform;

  const isHome = useCondition('isHome', location);
  const isCN = useCondition('isCN', location);

  if (!isHome && meta.filePath && !meta.gapless) {
    return (
      <div className="__dumi-default-layout-footer-meta">
        {repoPlatform && (
          <Link to={`${repoUrl}/edit/${branch}${dir}/${meta.filePath}`}>
            {isCN
              ? `在 ${repoPlatform} 上编辑此页`
              : `Edit this doc on ${repoPlatform}`}
          </Link>
        )}
        <span data-updated-text={isCN ? '最后更新时间：' : 'Last update: '}>
          {updatedTime}
        </span>
      </div>
    );
  }
  return <></>;
};

export const Renderer: React.FC<RerenderProps> = ({ content, location }) => {
  // 因为yml的desc不支持markdown，这里扩展了Desc标签
  const { desc: codeDesc, descHideTitle } = useContext(CodeContext);
  const { title, desc, demo } = useMeta();

  const themeConfig = useThemeConfig();
  const demoUrlUseSearch = location?.query?.demoUrl
  const demoUrl = demoUrlUseSearch ?? themeConfig?.demoUrl

  const { locale } = useContext(context);

  const themeCtx = useContext(CodeContext);
  const { themes, currentTheme, update } = themeCtx;

  const ref = useRef<HTMLIFrameElement>();
  useEffect(() => {
    const win = ref?.current?.contentWindow;
    if (win) {
      win.postMessage(
        {
          method: 'navigate',
          data: demo,
        },
        '*',
      );
    }
  }, [demo]);

  return (
    <div className="__dumi-default-layout-content">
      <div className="__dumi-default-mobile-content">
        <article>
          {title && (
            <div
              className={classnames('__dumi-default-content-header markdown', {
                'no-desc': !codeDesc,
              })}
            >
              {descHideTitle === 'true' || (
                <h1
                  dangerouslySetInnerHTML={{
                    __html: transform(title),
                  }}
                ></h1>
              )}
              {desc ? (
                <p
                  dangerouslySetInnerHTML={{
                    __html: transform(desc),
                  }}
                ></p>
              ) : (
                codeDesc
              )}
            </div>
          )}
          {demo && themes?.length > 1 && (
            <nav className="theme_selector_contain">
              <ul className="theme_selector">
                {themes.map((item, i) => (
                  <li
                    key={i}
                    className={classnames('theme_selector-item', {
                      active: item === currentTheme,
                    })}
                    onClick={() => {
                      themeCtx.currentTheme = item;
                      update({
                        currentTheme: item,
                      });
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {content}
          <Footer location={location} />
        </article>
        {demo && demoUrl && (
          <Device
            forwardRef={ref}
            className="__dumi-default-mobile-content-device"
            url={`${demoUrl}?locale=${locale}#${join(demo, currentTheme)}`}
          />
        )}
      </div>
    </div>
  );
};
