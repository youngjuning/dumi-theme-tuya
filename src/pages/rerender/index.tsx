import './style.less';

import React, { ReactNode, useContext } from 'react';

import Device from '../../components/Device';
import { CodeContext } from '../../context';
import { useMeta } from '../../hooks/useMeta';
import { useThemeConfig } from '../../hooks/useThemeConfig';
import { transform } from '../../parser';
import { classnames } from '../../utils/classnames';

export interface RerenderProps {
  content: ReactNode;
}

export const Renderer: React.FC<RerenderProps> = ({ content }) => {
  const { title, desc, demo } = useMeta();
  const { demoUrl } = useThemeConfig();

  const themeCtx = useContext(CodeContext);
  const { themes, currentTheme, update } = themeCtx;

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
            className="__dumi-default-mobile-content-device"
            url={`${demoUrl}/${demo}/${currentTheme}`}
          />
        )}
      </div>
    </div>
  );
};
