import { useNavigationControllerModal } from 'example/hooks/usenavigationcontrollermodal';
import { ReactNode, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { showActionSheet } from 'shared/components/actionsheet';
import { Button } from 'shared/components/button';
import { CheckBox } from 'shared/components/checkbox';
import { NotificationManager } from 'shared/components/notificationmanager';
import { Popup } from 'shared/components/popup';
import { PopupManager } from 'shared/components/popupmanager';
import { themeState } from '../../states/themestate';
import { MenuButton } from '../menu/menu';
import styles from './top.module.scss';

export const Top = () => {
  const { showNavigationControllerModal } = useNavigationControllerModal();

  const [theme, setTheme] = useRecoilState(themeState);

  // ナビゲーションモーダルを開く
  const setNavigationModalType = useCallback(() => {
    showNavigationControllerModal();
  }, []);

  // モーダルを表示する
  const openModal = useCallback(() => {
    PopupManager.open(
      <Popup onClose={() => NotificationManager.add('Hello!')}>
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
      </Popup>,
      true,
    );
  }, []);

  // モーダルを表示する
  const openModal2 = useCallback(() => {
    PopupManager.open(
      <Popup
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
      </Popup>,
    );
  }, []);

  // 通知を表示する
  const addNotification = useCallback(() => {
    NotificationManager.add('Yeah!!');
  }, []);

  return (
    <div className={styles.component}>
      {/* HEADER */}
      <div className={styles.title}>
        <div className={styles.titleLeft}></div>
        <div className={styles.titleContent}>
          <h1 className={styles.appName}>UIKit</h1>
        </div>
        <div className={styles.titleRight}>
          <MenuButton />
        </div>
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        <Row>
          <Button onClick={setNavigationModalType}>
            NavigationController + Modal
          </Button>
        </Row>
        <Row>
          <Button
            onClick={() => {
              showActionSheet(
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
            ActionSheet
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
            label="Dark Mode"
            checked={theme === 'dark'}
            onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
        </Row>
        <Row>
          Source:{' '}
          <a href="https://github.com/nariyu/uikit" target="_blank">
            github.com/nariyu/uikit
          </a>
        </Row>
      </div>
    </div>
  );
};

interface RowProps {
  children?: ReactNode;
}
const Row = ({ children }: RowProps) => {
  return <div style={{ margin: '2rem' }}>{children}</div>;
};
