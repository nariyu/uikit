import { ModalContainerContext } from 'example/context/containercontext';
import { useNavigationControllerModal } from 'example/hooks/usenavigationcontrollermodal';
import { useTheme } from 'example/hooks/usetheme';
import {
  NavigationController,
  NavigationControllerHandler,
} from 'lib/components/navigationcontroller';
import { TabNavigator } from 'lib/components/tabnavigator';
import { preventDefault } from 'lib/utils/elementutil';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  SyntheticEvent,
  useContext,
} from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  GlobalNavigationControlerContext,
  ModalNavigationControllerContext,
} from '../context/navigationcontrollercontext';
import { useWindowState } from '../hooks/usewindowstate';
import { menuState } from '../states/menustate';
import { userInfoState } from '../states/userinfostate';
import {
  Content1,
  Content1Icon,
  Content1IconSelected,
} from './contents/content1';
import {
  Content2,
  Content2Icon,
  Content2IconSelected,
} from './contents/content2';
import {
  Content3,
  Content3Icon,
  Content3IconSelected,
} from './contents/content3';
import styles from './mainview.module.scss';
import { Top } from './top/top';

/**
 * MainView
 */
export const MainView = () => {
  useWindowState();
  useTheme();

  const setMenuOpened = useSetRecoilState(menuState);
  const userInfo = useRecoilValue(userInfoState);

  // Modal
  const navigationModalRef = useRef<HTMLDivElement>(null);

  // NavigationController
  const navigationControllerRef = useRef<NavigationControllerHandler>(null);
  const modalNavigationControllerRef = useRef<NavigationControllerHandler>(
    null,
  );

  // Context
  const navigationController = useContext(GlobalNavigationControlerContext);

  // Hooks
  const {
    navigationControllerModalInfo,
    hideNavigationContollerModal,
  } = useNavigationControllerModal();

  const [
    navigationControllerViewIndex,
    setNavigationControllerViewIndex,
  ] = useState(-1);

  // ログインしたらメニューを閉じる
  useEffect(() => {
    if (userInfo) {
      if (navigationController) {
        navigationController.removeAllViews();
      }
    }
  }, [!!userInfo]);

  // モーダルの背景クリック
  const onClickModalBackground = useCallback((event: SyntheticEvent) => {
    preventDefault(event);
    if (navigationControllerRef.current) {
      navigationControllerRef.current.removeAllViews();
    }
    hideNavigationContollerModal();
  }, []);

  return (
    <GlobalNavigationControlerContext.Provider
      value={navigationControllerRef.current}
    >
      <ModalContainerContext.Provider value={navigationModalRef.current}>
        <ModalNavigationControllerContext.Provider
          value={modalNavigationControllerRef.current}
        >
          <div className={styles.component}>
            <Top />

            {/* MODAL BACKGROUND */}
            <div
              className={styles.navigationControllerModal}
              aria-hidden={
                navigationControllerViewIndex === -1 &&
                !navigationControllerModalInfo.shown
              }
              onClick={onClickModalBackground}
            />

            {/* MENU */}
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

            {/* MODAL NAVIGATION CONTROLLER */}
            <div
              className={styles.navigationModal}
              aria-hidden={!navigationControllerModalInfo.shown}
            >
              <div ref={navigationModalRef} className={styles.modalContainer} />
              <NavigationController
                ref={modalNavigationControllerRef}
                defaultTitle="NavigationController + Modal"
                defaultLeftButton="Close"
                onClickDefaultLeftButton={hideNavigationContollerModal}
              >
                <TabNavigator
                  items={[
                    {
                      title: 'Home',
                      icon: <Content1Icon />,
                      selectedIcon: <Content1IconSelected />,
                      view: <Content1 />,
                    },
                    {
                      title: 'Hello',
                      icon: <Content2Icon />,
                      selectedIcon: <Content2IconSelected />,
                      view: <Content2 />,
                    },
                    {
                      title: 'Wow!',
                      icon: <Content3Icon />,
                      selectedIcon: <Content3IconSelected />,
                      view: <Content3 />,
                    },
                  ]}
                />
              </NavigationController>
            </div>
          </div>
        </ModalNavigationControllerContext.Provider>
      </ModalContainerContext.Provider>
    </GlobalNavigationControlerContext.Provider>
  );
};
