import { navigationControllerModalState } from 'example/states/navigationcontrollermodalstate';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

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
