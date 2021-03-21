import { ReactNode, useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

interface Props {
  shown: boolean;
  id?: string;
  content?: ReactNode;
  options?: ActionSheetOptions;
}

export interface ActionSheetOptions {
  title?: ReactNode;
}

export const actionSheetState = atom<Props>({
  key: 'actionSheetState',
  default: {
    shown: false,
  },
});

// Hooks
export const useActionSheet = () => {
  const [actionSheetInfo, setActionSheetInfo] = useRecoilState(
    actionSheetState,
  );

  const showActionSheet = useCallback(
    (id: string, content: ReactNode, options?: ActionSheetOptions) => {
      setActionSheetInfo({
        shown: true,
        id,
        content,
        options,
      });
    },
    [],
  );

  const hideActionSheet = useCallback(() => {
    setActionSheetInfo((currValue) => {
      return {
        ...currValue,
        shown: false,
      };
    });
  }, []);

  return {
    actionSheetInfo,
    showActionSheet,
    hideActionSheet,
  };
};
