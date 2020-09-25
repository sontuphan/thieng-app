import { useLayoutEffect, useState } from 'react';

export const useData = (ref) => {
  const [data = {width: 0}, setData] = useState();

  useLayoutEffect(() => {
    function updateSize() {
      setData({ width: ref.current.offsetWidth })
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [ref]);

  return data;
}