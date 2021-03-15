import { ReactNode, useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';

interface Props {
  shown: boolean;
  id?: string;
  title?: string;
  content?: ReactNode;
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
    (id: string, title: string | undefined, content: ReactNode) => {
      setActionSheetInfo({
        shown: true,
        id,
        title,
        content,
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
