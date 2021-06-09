import { useEffect } from 'react';
import { useHistory } from 'react-router';

export const useHandlePostPath = () => {
  const history = useHistory();
  useEffect(() => {
    const handle = (event: MessageEvent<any>) => {
      const href = event?.data?.data;
      if (href) {
        history.push(href);
      }
    };
    window.addEventListener('message', handle);
    return () => window.removeEventListener('message', handle);
  }, [history]);
};
