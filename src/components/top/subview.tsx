import { ModalNavigationControllerContext } from 'context/navigationcontrollercontext';
import { useCallback, useContext } from 'react';
import { Button } from 'shared/components/button';
import styles from './subview.module.scss';

export const SubViewTitle = () => <>I am...</>;
export const SubViewContent = () => {
  const modalNavigationController = useContext(
    ModalNavigationControllerContext,
  );

  const nextView = useCallback(() => {
    modalNavigationController.pushView(
      <SubSubViewTitle />,
      <SubSubViewContent />,
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

const SubSubViewTitle = () => <>Hello, World!</>;
const SubSubViewContent = () => {
  return (
    <div
      style={{
        padding: '3rem 1rem',
        fontSize: '5rem',
        textAlign: 'center',
      }}
    >
      🤗
    </div>
  );
};
