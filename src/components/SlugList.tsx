import './SlugList.less';

import { AnchorLink } from 'dumi/theme';
import React, { FC } from 'react';

import { getArray } from '../utils';

const SlugsList: FC<{ slugs: any; className?: string }> = ({
  slugs,
  ...props
}) => (
  <ul role="slug-list" {...props}>
    {getArray<any>(slugs)
      .filter(({ depth }) => depth <= 2)
      .map(slug => (
        <li key={slug.heading} title={slug.value} data-depth={slug.depth}>
          <AnchorLink to={`#${slug.heading}`}>
            <span>{slug.value}</span>
          </AnchorLink>
        </li>
      ))}
  </ul>
);

export default SlugsList;
