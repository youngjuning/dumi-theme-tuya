import './Badge.less';

import { BadgeProps } from 'antd';
import React from 'react';

export default (props: BadgeProps) => (
  <span className="__dumi-default-badge" {...props} />
);
