import React, { useContext, useEffect, useMemo } from 'react';

import { CodeContext, IFProps } from '../context';

export default ({ children }: { children: React.ReactElement<IFProps>[] }) => {
  const themes = useMemo(() => {
    if (children) {
      return React.Children.map(children, child => child.props.theme);
    }
    return [];
  }, [children]);

  const codeCtx = useContext(CodeContext);

  useEffect(() => {
    codeCtx.update({
      themes,
      currentTheme: themes[0],
    });
  }, [themes]);

  return <>{children}</>;
};
