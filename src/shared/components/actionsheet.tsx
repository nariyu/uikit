import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { preventDefault } from 'shared/utils/elementutil';
import { useActionSheet } from 'states/actionsheetstate';
import styles from './actionsheet.module.scss';
import { CloseButton } from './closebutton';

interface Props {
  id: string;
  global?: boolean;
}
export const ActionSheet = (props: Props) => {
  const { id, global } = props;

  const { actionSheetInfo, hideActionSheet } = useActionSheet();
  const [shown, setShown] = useState(false);

  const options = actionSheetInfo.options || {};

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

  const renderItem = (
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

        {actionSheetInfo.id === id && typeof options.title === 'string' && (
          <div className={styles.title}>{options.title}</div>
        )}

        <div className={styles.content}>
          {actionSheetInfo &&
            actionSheetInfo.id === id &&
            actionSheetInfo.content}
        </div>
      </div>
    </>
  );

  if (global) {
    if (process.browser) {
      return createPortal(renderItem, document.body);
    } else {
      return renderItem;
    }
  } else {
    return renderItem;
  }
};
