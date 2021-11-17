import './SlugList.less';

import { AnchorLink, context } from 'dumi/theme';
import React, { FC, useContext } from 'react';
import { classnames } from '../utils';

import { getArray } from '../utils';

const getHash = () => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash;
    if (typeof hash === 'string') {
      return decodeURIComponent(hash.slice(1));
    }
  }
};

const SlugsList: FC<{ slugs: any; className?: string }> = ({
  slugs,
  ...props
}) => {
  const {
    meta: { title },
  } = useContext(context);
  const hash = getHash() || slugs?.[0]?.heading;
  return (
    <>
      <ul role="slug-list" {...props}>
        <li role="slug-list-title">{title}</li>
        {getArray<any>(slugs)
          .filter(slug => slug.depth < 4)
          .map(slug => (
            <li key={slug.heading} title={slug.value} data-depth={slug.depth}>
              <a
                href={`#${slug.heading}`}
                className={classnames({ active: hash === slug.heading })}
                onClick={() => {
                  AnchorLink.scrollToAnchor(slug.heading);
                }}
              >
                <span>{slug.value}</span>
              </a>
            </li>
          ))}
      </ul>
    </>
  );
};

export default SlugsList;
