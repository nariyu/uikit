import { atom } from 'recoil';

interface Props {
  shown: boolean;
}

export const navigationControllerModalState = atom<Props>({
  key: 'navigationControllerModalState',
  default: {
    shown: false,
  },
});
