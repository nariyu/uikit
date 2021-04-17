import { themeState } from 'example/states/themestate';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export const useTheme = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  // Detect color scheme
  useEffect(() => {
    if (window.matchMedia) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (event) => {
          setTheme(event.matches ? 'dark' : 'light');
        });
    }
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    const manifestElem = document.querySelector('link[rel="manifest"]');
    if (manifestElem) {
      manifestElem.setAttribute('href', `/manifest-${theme}.json`);
    }
    const themeColorElem = document.querySelector('meta[name="theme-color"]');
    if (themeColorElem) {
      themeColorElem.setAttribute(
        'content',
        theme === 'dark' ? '#000' : '#fff',
      );
    }
  }, [theme]);

  return { theme };
};
