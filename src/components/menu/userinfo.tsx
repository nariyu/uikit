import { useRecoilValue } from 'recoil';
import { userInfoState } from 'states/userinfostate';
import styles from './userinfo.module.scss';

export const UserInfo = () => {
  const userInfo = useRecoilValue(userInfoState);

  return (
    <div className={styles.component}>
      <div
        className={styles.icon}
        style={{ backgroundImage: `url(${userInfo.profileImageUrl})` }}
      />
      <div className={styles.name}>{userInfo.username}</div>
    </div>
  );
};
