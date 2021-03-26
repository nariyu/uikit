import { atom } from 'recoil';

const initialValue = process.browser
  ? {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  : undefined;

export const windowState = atom({
  key: 'windowState',
  default: initialValue,
});
