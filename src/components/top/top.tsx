import { ReactNode, useCallback, useState } from 'react';
import { Button } from 'shared/components/button';
import { Modal } from 'shared/components/modal';
import { ModalManager } from 'shared/components/modalmanager';
import { NotificationManager } from 'shared/components/notificationmanager';
import { useActionSheet } from 'states/actionsheetstate';
import { useNavigationControllerModal } from 'states/navigationcontrollermodalstate';
import { CheckBox } from '../../shared/components/checkbox';
import styles from './top.module.scss';

export const Top = () => {
  const { showActionSheet } = useActionSheet();
  const { showNavigationControllerModal } = useNavigationControllerModal();

  // ナビゲーションモーダルを開く
  const setNavigationModalType = useCallback(() => {
    showNavigationControllerModal();
  }, []);

  // モーダルを表示する
  const openModal = useCallback(() => {
    ModalManager.open(
      <Modal>
        <div
          style={{
            width: '17rem',
            height: '7rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 600,
          }}
        >
          Hello!
        </div>
      </Modal>,
      true,
    );
  }, []);

  // モーダルを表示する
  const openModal2 = useCallback(() => {
    ModalManager.open(
      <Modal
        buttons={[
          {
            label: 'Tea',
            primary: true,
            onClick: () => NotificationManager.add('I prefer tea to coffee.'),
          },
          {
            label: 'Coffee',
            onClick: () => NotificationManager.add('I prefer coffee to tea.'),
          },
        ]}
      >
        <div
          style={{
            width: '17rem',
            height: '7rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 600,
          }}
        >
          Which would you prefer?
        </div>
      </Modal>,
    );
  }, []);

  // 通知を表示する
  const addNotification = useCallback(() => {
    NotificationManager.add('Yeah!!');
  }, []);

  // ボタン
  const [buttonSelected, setButtonSelected] = useState(false);

  return (
    <div className={styles.component}>
      <Row>
        <Button onClick={setNavigationModalType}>
          NavigationController + Modal
        </Button>
      </Row>
      <Row>
        <Button
          onClick={() => {
            showActionSheet(
              'actionsheet1',
              'Wow!',
              <div
                style={{
                  padding: '1rem',
                  minHeight: '20rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '6rem',
                }}
              >
                😍
              </div>,
            );
          }}
        >
          Show ActionSheet
        </Button>
      </Row>
      <Row>
        <Button onClick={openModal}>Popup</Button>
      </Row>
      <Row>
        <Button onClick={openModal2}>Popup w/ Buttons</Button>
      </Row>
      <Row>
        <Button onClick={addNotification}>Notification</Button>
      </Row>
      <Row>
        <CheckBox
          label="CHECKBOX"
          onChange={(checked) =>
            NotificationManager.add(checked ? 'Checked' : 'Unchecked')
          }
        />
      </Row>
      <Row>
        <Button
          aria-selected={buttonSelected}
          onClick={() => {
            setButtonSelected(!buttonSelected);
            NotificationManager.add(buttonSelected ? 'Unselect' : 'Select');
          }}
        >
          {buttonSelected ? 'Selected' : 'Not Selected'}
        </Button>
      </Row>
      <Row>
        Source:{' '}
        <a href="https://github.com/nariyu/uikit" target="_blank">
          github.com/nariyu/uikit
        </a>
      </Row>
    </div>
  );
};

interface RowProps {
  children?: ReactNode;
}
const Row = ({ children }: RowProps) => {
  return <div style={{ margin: '2rem' }}>{children}</div>;
};
