import React from 'react';
import './style.less';

export interface FlushButtonProps {
  text: string;
  link: string;
}

export const FlushButton: React.FC<FlushButtonProps> = ({ text, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      className="__dumi-default-flush-button"
      dangerouslySetInnerHTML={{
        __html: `<button>
    <div class="left"></div>
      ${text}
    <div class="right"></div>
  </button>
`,
      }}
    ></a>
  );
};
