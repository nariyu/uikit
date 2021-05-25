import { Submittable } from 'lib/components/navigationcontroller';
import { NotificationType } from 'lib/components/notification';
import { NotificationManager } from 'lib/components/notificationmanager';
import { Spinner } from 'lib/components/spinner';
import { TextInput, TextInputHandler } from 'lib/components/textinput';
import { classNames } from 'lib/utils/elementutil';
import {
  forwardRef,
  RefObject,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../states/userinfostate';
import styles from './editpage.module.scss';

interface Props {
  onClose: () => void;
}
export const UsernameEdit = forwardRef(
  (props: Props, ref: RefObject<Submittable>) => {
    const { onClose } = props;

    const usernameTextInputRef = useRef<TextInputHandler>(null);

    const [userInfo, setUserInfo] = useRecoilState(userInfoState);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [errorType, setErrorType] = useState<'' | 'username'>('');

    // OK
    const submit = useCallback(() => {
      setError('');
      setErrorType('');

      const usernameTextInput = usernameTextInputRef.current;
      if (!usernameTextInput) return;

      const username = usernameTextInput.getValue();

      // バリデーション
      if (!username) {
        setErrorType('username');
        setError('Please enter your name.');
        return;
      }

      setLoading(true);

      new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        setLoading(false);
        setUserInfo((userInfo) => ({ ...userInfo, username }));
        NotificationManager.add('Username is updated.', NotificationType.Info);
        onClose();
      });
    }, [onClose]);

    useImperativeHandle(ref, () => ({ submit }), [submit]);

    return (
      <div className={styles.component}>
        <div className={styles.field}>
          <TextInput
            ref={usernameTextInputRef}
            name="username"
            label="Username"
            disabled={loading}
            defaultValue={userInfo.username}
            labelClassName={classNames(
              errorType === 'username' ? styles.errorLabel : undefined,
            )}
            inputClassName={classNames(
              errorType === 'username' ? styles.errorInput : undefined,
            )}
          />
        </div>
        {errorType === 'username' && (
          <p className={styles.fieldError}>{error}</p>
        )}
        {loading && <Spinner />}
      </div>
    );
  },
);

export const UsernameEditTitle = () => <>Username</>;
export const UsernameEditSubmitButton = () => <>Save</>;
