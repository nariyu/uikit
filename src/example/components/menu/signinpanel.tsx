import { Button } from 'lib/components/button';
import { preventDefault } from 'lib/utils/elementutil';
import { SyntheticEvent, useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { defaultUserInfo, userInfoState } from '../../states/userinfostate';
import styles from './signinpanel.module.scss';

export const SigninPanel = () => {
  const setUserInfo = useSetRecoilState(userInfoState);

  const [loading, setLoading] = useState(false);

  const onClick = useCallback((event: SyntheticEvent) => {
    preventDefault(event);

    setLoading(true);

    Promise.resolve()
      .then(() => new Promise((resolve) => setTimeout(resolve, 1000)))
      .then(() => {
        setUserInfo(defaultUserInfo);
      });
  }, []);

  return (
    <div className={styles.component}>
      <Button onClick={onClick} aria-disabled={loading}>
        {loading ? 'Signing in...' : 'Sign in'}
      </Button>
    </div>
  );
};
