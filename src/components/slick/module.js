import { useLayoutEffect, useState } from 'react';

export const useData = (slickRef) => {
  const [data = {width: 0}, setData] = useState();

  useLayoutEffect(() => {
    function updateSize() {
      setData({ width: slickRef.current.offsetWidth })
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [slickRef]);

  return data;
}