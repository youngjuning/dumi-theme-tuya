import { useMemo, useRef, useState } from 'react';

export function useDerivedStateFromProps<T>(s: T): [T, (s: T) => void] {
  const stateRef = useRef<T>(s);
  const [_, forceUpdate] = useState({});

  useMemo(() => {
    stateRef.current = s;
  }, [s]);

  const setState = (s: T) => {
    stateRef.current = s;
    forceUpdate({});
  };

  return [stateRef.current, setState];
}
