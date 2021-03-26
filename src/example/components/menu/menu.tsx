import { MenuAlt3 as MenuIcon } from '@styled-icons/heroicons-outline/MenuAlt3';
import React, { SyntheticEvent, useCallback, useContext, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { CheckBox } from 'shared/components/checkbox';
import { MenuItem } from 'shared/components/menuitem';
import { MenuSection } from 'shared/components/menusection';
import { Submittable } from 'shared/components/navigationcontroller';
import { preventDefault } from 'shared/utils/elementutil';
import { Config } from '../../config';
import { GlobalNavigationControlerContext } from '../../context/navigationcontrollercontext';
import { menuState } from '../../states/menustate';
import { userInfoState } from '../../states/userinfostate';

import { EmailEdit, EmailEditSubmitButton, EmailEditTitle } from './emailedit';
import styles from './menu.module.scss';
import {
  PhoneNumberEdit,
  PhoneNumberEditSubmitButton,
  PhoneNumberEditTitle,
} from './phonenumberedit';
import { SigninPanel } from './signinpanel';
import { UserInfo } from './userinfo';
import {
  UsernameEdit,
  UsernameEditSubmitButton,
  UsernameEditTitle,
} from './usernameedit';

export const Menu = () => {
  const navigationController = useContext(GlobalNavigationControlerContext);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  // ビューの参照
  const usernameEditRef = useRef<Submittable>(null);
  const emailEditRef = useRef<Submittable>(null);
  const phoneEditRef = useRef<Submittable>(null);

  // 編集ボタン
  const onClickEditButton = useCallback(
    (type: string) => {
      if (!navigationController) return;

      if (type === 'username') {
        navigationController.pushView(
          <UsernameEditTitle />,
          <UsernameEdit
            ref={usernameEditRef}
            onClose={() => navigationController.popView()}
          />,
          <UsernameEditSubmitButton />,
          { submit: usernameEditRef },
        );
      } else if (type === 'phone') {
        navigationController.pushView(
          <PhoneNumberEditTitle />,
          <PhoneNumberEdit
            ref={phoneEditRef}
            onClose={() => navigationController.popView()}
          />,
          <PhoneNumberEditSubmitButton />,
          { submit: phoneEditRef },
        );
      } else if (type === 'email') {
        navigationController.pushView(
          <EmailEditTitle />,
          <EmailEdit
            ref={emailEditRef}
            onClose={() => navigationController.popView()}
          />,
          <EmailEditSubmitButton />,
          { submit: emailEditRef },
        );
      }
    },
    [navigationController],
  );

  return (
    <div className={styles.component}>
      {userInfo ? (
        <>
          <UserInfo />
          <MenuSection title="Settings">
            <MenuItem
              title="Username"
              info={userInfo.username}
              icon="arrow"
              onClick={() => onClickEditButton('username')}
            />
            <MenuItem
              title="Email"
              info={userInfo.email}
              icon="arrow"
              onClick={() => onClickEditButton('email')}
            />
            <MenuItem
              title="Phone Number"
              info={userInfo.phoneNumber}
              icon="arrow"
              onClick={() => onClickEditButton('phone')}
            />
            <MenuItem
              title={userInfo.happy ? 'Happy!😍' : 'Happy?'}
              icon={
                <CheckBox
                  defaultChecked={userInfo.happy}
                  onChange={(checked) =>
                    setUserInfo((userInfo) => ({ ...userInfo, happy: checked }))
                  }
                />
              }
            />
          </MenuSection>
          <MenuSection title="Links">
            <MenuItem
              title="Facebook"
              info="nariyu.jp"
              href="https://www.facebook.com/nariyu.jp"
            />
            <MenuItem
              title="Twitter"
              info="@nariyu"
              href="https://www.twitter.com/nariyu"
            />
            <MenuItem
              title="Instagram"
              info="nariyu"
              href="https://www.instagram.com/nariyu/"
            />
          </MenuSection>
        </>
      ) : (
        <>
          <SigninPanel />
          <MenuSection title="Links">
            <MenuItem title="Google" href="https://www.google.com/" />
            <MenuItem title="Amazon" href="https://www.amazon.com/" />
            <MenuItem title="Facebook" href="https://www.facebook.com/" />
            <MenuItem title="Apple" href="https://www.apple.com/" />
            <MenuItem title="Microsoft" href="https://www.microsoft.com/" />
          </MenuSection>
        </>
      )}

      {userInfo && (
        <MenuSection>
          <MenuItem
            title="Sign out"
            centered
            titleStyle={{ color: '#f00' }}
            onClick={() => {
              setUserInfo(undefined);
            }}
          />
        </MenuSection>
      )}

      <VersionView />
    </div>
  );
};

// メニュータイトル
export const MenuTitle = () => {
  return <>Menu</>;
};

// メニューボタン
export const MenuButton = () => {
  const navigationController = useContext(GlobalNavigationControlerContext);

  const userInfo = useRecoilValue(userInfoState);

  const setMenuOpened = useSetRecoilState(menuState);

  // メニューを開く
  const onClickMenuOpenButton = useCallback(
    (event: SyntheticEvent) => {
      preventDefault(event);

      if (!navigationController) return;

      setMenuOpened(true);

      navigationController.pushView(<MenuTitle />, <Menu />);
    },
    [navigationController],
  );

  return (
    <div className={styles.menuBtn} onClick={onClickMenuOpenButton}>
      {userInfo ? (
        <div
          className={styles.icon}
          style={{ backgroundImage: `url(${userInfo.profileImageUrl})` }}
        />
      ) : (
        <MenuIcon />
      )}
    </div>
  );
};

// バージョン
const VersionView = () => {
  return <div className={styles.versionInfo}>Version {Config.VERSION}</div>;
};
