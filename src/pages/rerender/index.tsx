import './style.less';

import { context } from 'dumi/theme';
import { Location } from 'history-with-query';
import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react';

import Device from '../../components/Device';
import { CodeContext } from '../../context';
import { useMeta } from '../../hooks/useMeta';
import { useThemeConfig } from '../../hooks/useThemeConfig';
import { transform } from '../../parser';
import { classnames } from '../../utils/classnames';
import { join } from '../../utils/join';

export interface RerenderProps {
  content: ReactNode;
  location: Location<{}>;
}

export const Renderer: React.FC<RerenderProps> = ({ content, location }) => {
  // 因为yml的desc不支持markdown，这里扩展了Desc标签
  const { desc: codeDesc, descHideTitle } = useContext(CodeContext);
  const { title, desc, demo } = useMeta();

  const { demoUrl } = useThemeConfig();
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

  const [] = useState();
  console.log('descHideTitle', descHideTitle);
  return (
    <div className="__dumi-default-layout-content">
      <div className="__dumi-default-mobile-content">
        <article>
          {title && (desc || codeDesc) && (
            <div className="__dumi-default-content-header markdown">
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
