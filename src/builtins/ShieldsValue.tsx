import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';

let cache = null;

export default ({ data, href, name }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const init = async () => {
    try {
      setLoading(true);

      let store = {};
      if (cache) {
        store = cache;
      } else {
        store = await fetch(`${data}?t=${Date.now()}`).then(res => res.json());
        cache = store;
      }

      const result = store[name];
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
