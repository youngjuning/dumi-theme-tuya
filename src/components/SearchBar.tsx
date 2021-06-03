import './SearchBar.less';

import { AnchorLink, useSearch } from 'dumi/theme';
import React, { useEffect, useRef, useState } from 'react';

import { useCondition } from '../hooks';
import { useI18N } from '../hooks/useI18N';
import { SearchIcon } from './svg';

export default ({ location }) => {
  const [keywords, setKeywords] = useState<string>('');
  const [items, setItems] = useState<any[]>([]);
  const input = useRef<HTMLInputElement>(null);
  const result = useSearch(keywords);
  const isHome = useCondition('isHome', location);

  const i18n = useI18N({
    placeholder: {
      zh: '搜索组件...',
      en: 'search component...',
    },
  });

  useEffect(() => {
    if (Array.isArray(result)) {
      setItems(result);
    } else if (typeof result === 'function' && input.current) {
      result(`.${input.current.className}`);
    }
  }, [result]);

  return (
    <div className="__dumi-default-search" data-is-home={isHome}>
      <SearchIcon />
      <input
        className="__dumi-default-search-input"
        type="search"
        placeholder={i18n('placeholder')}
        ref={input}
        {...(Array.isArray(result)
          ? { value: keywords, onChange: ev => setKeywords(ev.target.value) }
          : {})}
      />
      <ul>
        {items.map(meta => (
          <li key={meta.path} onClick={() => setKeywords('')}>
            <AnchorLink to={meta.path}>
              {meta.parent?.title && <span>{meta.parent.title}</span>}
              {meta.title}
            </AnchorLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
