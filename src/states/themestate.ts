import { atom } from 'recoil';

export const themeState = atom<'dark' | 'light'>({
  key: 'themeState',
  default:
    process.browser &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
});
