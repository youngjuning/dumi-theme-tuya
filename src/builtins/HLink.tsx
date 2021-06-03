import './Badge.less';

import { NavLink } from 'dumi/theme';
import React, { useContext } from 'react';

import { CodeContext } from '../context';

// ModelProps | Model
// ModelProps#api | Model#api
// Model api
export default ({ to, children }: { to: string; children: string }) => {
  const { linkMap } = useContext(CodeContext);
  let key = '';
  let href = '';
  let hash = '';

  if (to) {
    if (to.includes('/')) {
      // http
      href = to;
    } else {
      // hash
      if (to.includes('#')) {
        [key, hash] = to.split('#');
      } else {
        key = to;
      }
      href = linkMap?.[key]?.path;
    }
  }

  if (hash) {
    href = `${href}#${hash}`;
  }

  return <NavLink to={href}>{children}</NavLink>;
};
