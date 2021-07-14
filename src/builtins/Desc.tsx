import { useLocation } from 'dumi';
import React, { useContext, useEffect } from 'react';

import { CodeContext } from '../context';

export default ({ children, hidetitle }) => {
  const codeCtx = useContext(CodeContext);
  const location = useLocation();
  useEffect(() => {
    codeCtx.update({
      desc: children,
      descHideTitle: hidetitle,
    });
  }, [children, location.pathname, hidetitle]);
  return <></>;
};
