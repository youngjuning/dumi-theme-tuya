import './Changelog.less';

import React, { CSSProperties } from 'react';

// traverse and map fiber list
// changelog列表排版
export default ({ children }: { children: JSX.Element }) => {
  return (
    <div className="__dumi-default-changelog">
      {React.Children.map(children, (fiber, i) => {
        if (typeof fiber.type === 'string') {
          // 约定h2是日期标题
          if (fiber.type === 'h2') {
            // 这里需要去除svg、转换日期样式
            const children = fiber.props?.children ?? [];
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
            return React.cloneElement(fiber, {
              style: {
                paddingLeft: 58,
              } as CSSProperties,
            });
          }
        }
      })}
    </div>
  );
};
