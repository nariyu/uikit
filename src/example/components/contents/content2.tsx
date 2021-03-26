import { ModalNavigationControllerContext } from 'example/context/navigationcontrollercontext';
import { SyntheticEvent, useCallback, useContext } from 'react';
import { Button } from 'shared/components/button';
import { preventDefault } from 'shared/utils/elementutil';
import styles from './content.module.scss';
import { Content2BContent, Content2BTitle } from './content2b';

export const Content2 = () => {
  const modalNavigationController = useContext(
    ModalNavigationControllerContext,
  );

  // Next ボタン
  const onClickNextNavigation = useCallback(
    (event: SyntheticEvent) => {
      preventDefault(event);

      if (modalNavigationController) {
        modalNavigationController.pushView(
          <Content2BTitle />,
          <Content2BContent />,
        );
      }
    },
    [modalNavigationController],
  );

  return (
    <div className={styles.component}>
      <p>Hello!</p>
      <Button data-block onClick={onClickNextNavigation}>
        Next
      </Button>
    </div>
  );
};

export const Content2Icon = () => <span style={{ opacity: 0.3 }}>🌷</span>;
export const Content2IconSelected = () => <>🌷</>;
