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
  }, [theme]);

  return { theme };
};

// initial
if (process.browser && document.documentElement) {
  const theme =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  document.documentElement.setAttribute('data-theme', theme);
}
