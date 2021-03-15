import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { preventDefault } from 'shared/utils/elementutil';
import { useActionSheet } from 'states/actionsheetstate';
import styles from './actionsheet.module.scss';
import { CloseButton } from './closebutton';

interface Props {
  id: string;
}
export const ActionSheet = (props: Props) => {
  const { id } = props;

  const { actionSheetInfo, hideActionSheet } = useActionSheet();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    setShown(
      actionSheetInfo && actionSheetInfo.shown && actionSheetInfo.id === id,
    );
  }, [id, actionSheetInfo]);

  const onClickBackground = useCallback((event: SyntheticEvent) => {
    preventDefault(event);
    hideActionSheet();
  }, []);

  const onClickCloseButton = useCallback((event: SyntheticEvent) => {
    preventDefault(event);

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    hideActionSheet();
  }, []);

  return (
    <>
      <div
        className={styles.background}
        aria-hidden={!shown}
        onClick={onClickBackground}
      />
      <div
        className={styles.component}
        data-ui="actionsheet"
        aria-hidden={!shown ? true : undefined}
        onClick={preventDefault}
      >
        <div className={styles.closeBtn} onClick={onClickCloseButton}>
          <CloseButton color="white" />
        </div>

        {actionSheetInfo &&
          actionSheetInfo.id === id &&
          typeof actionSheetInfo.title === 'string' && (
            <div className={styles.title}>{actionSheetInfo.title}</div>
          )}

        <div className={styles.content}>
          {actionSheetInfo &&
            actionSheetInfo.id === id &&
            actionSheetInfo.content}
        </div>
      </div>
    </>
  );
};
