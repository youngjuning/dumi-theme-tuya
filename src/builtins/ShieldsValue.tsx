import './ShieldsValue.less';

import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';

const parseSvg = async (url: string) => {
  const html = await fetch(
    `https://cors-anywhere.herokuapp.com/${url}`,
  ).then(res => res.text());
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'image/svg+xml');
  const g =
    doc.querySelector('svg > g:last-child') ??
    doc.querySelector('svg > g:nth-child(4)');
  const label = g.querySelector('text:first-child')?.textContent;
  const value = g.querySelector('text:last-child')?.textContent;
  return {
    label,
    value,
  };
};

export default ({ data, href }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const init = async () => {
    try {
      setLoading(true);
      const result = await parseSvg(data);
      setText(`${result.label}：${result.value}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  if (loading) {
    return (
      <Skeleton
        className="__dumi-default-shields-value"
        active
        paragraph={false}
      />
    );
  }

  return (
    <a target="_blank" href={href}>
      {text}
    </a>
  );
};
