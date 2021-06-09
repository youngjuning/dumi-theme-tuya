import './style.less';

import { Location } from 'history-with-query';
import React, { ReactNode, useContext, useEffect, useRef } from 'react';

import Device from '../../components/Device';
import { CodeContext } from '../../context';
import { useMeta } from '../../hooks/useMeta';
import { useThemeConfig } from '../../hooks/useThemeConfig';
import { transform } from '../../parser';
import { classnames } from '../../utils/classnames';
import { join } from '../../utils/join'
import { context } from 'dumi/theme';

export interface RerenderProps {
  content: ReactNode;
  location: Location<{}>;
}

export const Renderer: React.FC<RerenderProps> = ({ content, location }) => {
  const { title, desc, demo = 'true' } = useMeta();
  const { demoUrl } = useThemeConfig();
  const { locale } = useContext(context)

  const themeCtx = useContext(CodeContext);
  const { themes, currentTheme, update } = themeCtx;

  const ref = useRef<HTMLIFrameElement>()
  useEffect(() => {
    const win = ref?.current?.contentWindow
    if (win) {
      win.postMessage({
        method: 'navigate',
        data: demo
      }, '*')
    }
  }, [demo])

  return (
    <div className="__dumi-default-layout-content">
      <div className="__dumi-default-mobile-content">
        <article>
          {title && desc && (
            <div className="__dumi-default-content-header markdown">
              <h1
                dangerouslySetInnerHTML={{
                  __html: transform(title),
                }}
              ></h1>
              <p
                dangerouslySetInnerHTML={{
                  __html: transform(desc),
                }}
              ></p>
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
