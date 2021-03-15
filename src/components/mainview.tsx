import { useWindowState } from 'hooks/usewindowstate';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  SyntheticEvent,
} from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { preventDefault } from 'shared/utils/elementutil';
import { useActionSheet } from 'states/actionsheetstate';
import { menuState } from 'states/menustate';
import { useNavigationControllerModal } from 'states/navigationcontrollermodalstate';
import { themeState } from 'states/themestate';
import { userInfoState } from 'states/userinfostate';
import { ActionSheet } from '../shared/components/actionsheet';
import { Button } from '../shared/components/button';
import {
  NavigationController,
  NavigationControllerHandler,
} from '../shared/components/navigationcontroller';
import { TabNavigator } from '../shared/components/tabnavigator';
import styles from './mainview.module.scss';
import { MenuButton } from './menu/menu';
import { Top } from './top/top';

/**
 * MainView
 */
export const MainView = () => {
  useWindowState();

  const [theme, setTheme] = useRecoilState(themeState);
  const userInfo = useRecoilValue(userInfoState);

  useEffect(() => {
    if (window.matchMedia) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (event) => {
          setTheme(event.matches ? 'dark' : 'light');
        });
    }
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // NavigationController
  const navigationControllerRef = useRef<NavigationControllerHandler>(null);
  const navigationControllerModalRef = useRef<NavigationControllerHandler>(
    null,
  );

  const setMenuOpened = useSetRecoilState(menuState);

  const {
    navigationControllerModalInfo,
    hideNavigationContollerModal,
  } = useNavigationControllerModal();
  const { showActionSheet, hideActionSheet } = useActionSheet();

  const [
    navigationControllerViewIndex,
    setNavigationControllerViewIndex,
  ] = useState(-1);

  // ログインしたらメニューを閉じる
  useEffect(() => {
    if (userInfo) {
      const navigationController = navigationControllerRef.current;
      if (navigationController) {
        navigationController.removeAllViews();
      }
    }
  }, [!!userInfo]);

  // モーダルが開いたら
  useEffect(() => {
    if (navigationControllerModalInfo.shown) {
      hideActionSheet();
    }
  }, [navigationControllerModalInfo]);

  // モーダルの背景クリック
  const onClickModalBackground = useCallback((event: SyntheticEvent) => {
    preventDefault(event);
    const navigationController = navigationControllerRef.current;
    if (navigationController) {
      navigationController.removeAllViews();
    }
    hideNavigationContollerModal();
  }, []);

  // Next ボタン
  const onClickNextNavigation = useCallback((event: SyntheticEvent) => {
    preventDefault(event);

    const navigationControllerModal = navigationControllerModalRef.current;
    if (navigationControllerModal) {
      navigationControllerModal.pushView(
        'I am ...',
        <div style={{ padding: '1rem' }}>
          <p>I am Nariyu.</p>
          <Button
            data-block
            onClick={() => {
              navigationControllerModal.pushView(
                'Hello, World!',
                <div
                  style={{
                    padding: '3rem 1rem',
                    fontSize: '5rem',
                    textAlign: 'center',
                  }}
                >
                  🤗
                </div>,
              );
            }}
          >
            Next
          </Button>
        </div>,
      );
    }
  }, []);

  return (
    <div className={styles.component}>
      <div className={styles.topView}>
        <div className={styles.topViewTitle}>
          <div className={styles.topViewTitleLeft}></div>
          <div className={styles.topViewTitleContent}>
            <h1 className={styles.appName}>
              {userInfo && userInfo.happy && '😍 '}
              UIKit{userInfo && userInfo.happy && ' 😍'}
            </h1>
          </div>
          <div className={styles.topViewTitleRight}>
            <MenuButton navigationControllerRef={navigationControllerRef} />
          </div>
        </div>
        <div className={styles.topViewContent}>
          <Top />
        </div>
      </div>

      <div
        className={styles.navigationControllerModal}
        aria-hidden={
          navigationControllerViewIndex === -1 &&
          !navigationControllerModalInfo.shown
        }
        onClick={onClickModalBackground}
      />

      <div
        className={styles.navigationController}
        aria-hidden={navigationControllerViewIndex === -1}
      >
        <NavigationController
          ref={navigationControllerRef}
          defaultNoBorder={true}
          onClose={() => setMenuOpened(false)}
          onChangeIndex={(index) => {
            setNavigationControllerViewIndex(index);
          }}
        ></NavigationController>
      </div>

      <div
        className={styles.navigationModalContainer}
        aria-hidden={!navigationControllerModalInfo.shown}
      >
        <div
          className={styles.navigationModal}
          aria-hidden={!navigationControllerModalInfo.shown}
        >
          <NavigationController
            ref={navigationControllerModalRef}
            defaultTitle="Modal w/ NavigationController"
            defaultLeftButton="Close"
            onClickDefaultLeftButton={hideNavigationContollerModal}
          >
            <TabNavigator
              items={[
                {
                  title: 'Home',
                  icon: <span style={{ opacity: 0.3 }}>🙇‍♂️</span>,
                  selectedIcon: <>🙇‍♂️</>,
                  view: (
                    <div style={{ padding: '1rem', textAlign: 'center' }}>
                      Welcome!
                    </div>
                  ),
                },
                {
                  title: 'Hello',
                  icon: <span style={{ opacity: 0.3 }}>🌷</span>,
                  selectedIcon: <>🌷</>,
                  view: (
                    <div style={{ padding: '1rem', textAlign: 'center' }}>
                      <p>Hello!</p>
                      <Button data-block onClick={onClickNextNavigation}>
                        Next
                      </Button>
                    </div>
                  ),
                },
                {
                  title: 'Wow!',
                  icon: <span style={{ opacity: 0.3 }}>⚽️</span>,
                  selectedIcon: <>⚽️</>,
                  view: (
                    <div style={{ padding: '1rem', textAlign: 'center' }}>
                      <Button
                        onClick={() => {
                          showActionSheet(
                            'actionsheet',
                            '"ACTION SHEET"',
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
                              🥰
                            </div>,
                          );
                        }}
                      >
                        Show ActionSheet
                      </Button>
                    </div>
                  ),
                },
              ]}
            />
          </NavigationController>
        </div>
      </div>

      <ActionSheet id="actionsheet" />
    </div>
  );
};
