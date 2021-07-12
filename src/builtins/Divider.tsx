import './Divider.less';

import React from 'react';

export default () => {
  return (
    <code
      className="__dumi-default-divider"
      ref={ref => {
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
