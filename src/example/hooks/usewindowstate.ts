import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { windowState } from '../states/windowstate';

export const useWindowState = () => {
  const [windowSize, setWindowSize] = useRecoilState(windowState);
  useEffect(() => {
    const onReize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    onReize();
    window.addEventListener('resize', onReize);

    return () => {
      window.removeEventListener('resize', onReize);
    };
  }, []);

  return windowSize;
};

export const useWindowValue = () => {
  return useRecoilValue(windowState);
};
