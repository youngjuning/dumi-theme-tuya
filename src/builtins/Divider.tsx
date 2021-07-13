import './Divider.less';

import React from 'react';

// 这个组件的作用是添加一个虚拟的分割线（markdown拆分）
export default () => {
  return (
    <code
      className="__dumi-default-divider"
      ref={ref => {
        // 模拟css父选择器，等css父选择:has()落地
        const nextSibling = ref?.parentElement?.nextSibling as HTMLElement;
        const isTitle = nextSibling?.tagName?.toLowerCase().startsWith('h');
        if (nextSibling && isTitle) {
          nextSibling.style.marginTop = '0';
        }
      }}
    >
      {/* 不要删掉这个点 */}.
    </code>
  );
};
