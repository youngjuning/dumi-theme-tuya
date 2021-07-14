import './Changelog.less';

import React, { CSSProperties, useEffect, useRef } from 'react';

// traverse and map fiber list
// changelog列表排版
// 这里的意义是转换处理日期
// 分割线和对齐其实可以用css伪类，但是先这样吧
// 主要是想无侵入式地修改changelog排版
export default ({ children }: { children: JSX.Element }) => {
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (parent) {
      parent.style.paddingLeft = '24px';
    }
  }, []);
  return (
    <div ref={ref} className="__dumi-default-changelog">
      {React.Children.map(children, (fiber, i) => {
        if (typeof fiber.type === 'string') {
          if (fiber.type === 'h2') {
            const children = fiber.props?.children ?? [];
            // fiber是immutable的，这里需要修改props所以clone一下
            const newFiber = React.cloneElement(fiber, {
              className: 'version_title',
              children: React.Children.map(children, (fiber, i) => {
                if (typeof fiber.type === 'function') {
                  return React.cloneElement(fiber, {
                    className: 'changelog-anchor',
                  });
                } else {
                  // 处理日期
                  if (
                    typeof fiber === 'string' &&
                    /^ \(\d{4}-\d{2}-\d{2}\)/.test(fiber)
                  ) {
                    return (
                      <span className="date_style">
                        {fiber.replace(/ \(|\)/g, '')}
                      </span>
                    );
                  }
                  return fiber;
                }
              }),
            });

            // 添加分割线
            return (
              <>
                {i > 0 && <hr className="divider" />}
                {newFiber}
              </>
            );
          }
          if (fiber.type.startsWith('h') && fiber.type !== 'h3') {
            return fiber;
          } else {
            // 左边距对齐
            return React.cloneElement(fiber, {
              style: {
                paddingLeft: 58,
              } as CSSProperties,
            });
          }
        }
        return fiber;
      })}
    </div>
  );
};
