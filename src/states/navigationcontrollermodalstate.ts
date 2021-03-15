import { useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

interface Props {
  shown: boolean;
}

export const navigationControllerModalState = atom<Props>({
  key: 'navigationControllerModalState',
  default: {
    shown: false,
  },
});

// Hooks
export const useNavigationControllerModal = () => {
  const [
    navigationControllerModalInfo,
    setNavigationControllerModalInfo,
  ] = useRecoilState(navigationControllerModalState);

  const showNavigationControllerModal = useCallback(() => {
    setNavigationControllerModalInfo({
      shown: true,
    });
  }, []);

  const hideNavigationContollerModal = useCallback(() => {
    setNavigationControllerModalInfo((currValue) => {
      return {
        ...currValue,
        shown: false,
      };
    });
  }, []);

  return {
    navigationControllerModalInfo,
    showNavigationControllerModal,
    hideNavigationContollerModal,
  };
};
