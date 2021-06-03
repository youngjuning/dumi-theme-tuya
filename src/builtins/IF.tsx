import React, { useContext } from 'react';

import { CodeContext, IFProps } from '../context';

const IF: React.FC<IFProps> = ({ theme, children }) => {
  const { currentTheme } = useContext(CodeContext);

  return <>{currentTheme === theme ? children : null}</>;
};

export default IF;
