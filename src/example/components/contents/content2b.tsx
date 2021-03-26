import { useCallback, useContext } from 'react';
import { Button } from 'shared/components/button';
import { ModalNavigationControllerContext } from '../../context/navigationcontrollercontext';
import styles from './content2b.module.scss';
import { Content2CContent, Content2CTitle } from './content2c';

export const Content2BTitle = () => <>I am...</>;
export const Content2BContent = () => {
  const modalNavigationController = useContext(
    ModalNavigationControllerContext,
  );

  const nextView = useCallback(() => {
    modalNavigationController.pushView(
      <Content2CTitle />,
      <Content2CContent />,
    );
  }, [modalNavigationController]);

  return (
    <div className={styles.component}>
      <p>I am Nariyu.</p>
      <Button data-block onClick={nextView}>
        Next
      </Button>
    </div>
  );
};
