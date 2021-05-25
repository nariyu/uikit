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
import { validateEmail } from '../../validators';
import styles from './editpage.module.scss';

interface Props {
  onClose: () => void;
}
export const EmailEdit = forwardRef(
  (props: Props, ref: RefObject<Submittable>) => {
    const { onClose } = props;

    const emailTextInputRef = useRef<TextInputHandler>(null);

    const [userInfo, setUserInfo] = useRecoilState(userInfoState);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [errorType, setErrorType] = useState<'' | 'email'>('');

    // OK
    const submit = useCallback(() => {
      setError('');
      setErrorType('');

      const emailTextInput = emailTextInputRef.current;
      if (!emailTextInput) return;

      const email = emailTextInput.getValue();

      // バリデーション
      if (!email) {
        setErrorType('email');
        setError('Please enter your email.');
        return;
      } else if (!validateEmail(email)) {
        setErrorType('email');
        setError('Please enter your email correctly.');
        return;
      }

      setLoading(true);

      new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        setLoading(false);
        setUserInfo((userInfo) => ({ ...userInfo, email }));
        NotificationManager.add('Email is updated.', NotificationType.Info);
        onClose();
      });
    }, [onClose]);

    useImperativeHandle(ref, () => ({ submit }), [submit]);

    return (
      <div className={styles.component}>
        <div className={styles.field}>
          <TextInput
            ref={emailTextInputRef}
            name="email"
            label="Email"
            placeholder="abc@example.com"
            disabled={loading}
            defaultValue={userInfo.email}
            labelClassName={classNames(
              errorType === 'email' ? styles.errorLabel : undefined,
            )}
            inputClassName={classNames(
              errorType === 'email' ? styles.errorInput : undefined,
            )}
          />
        </div>
        {errorType === 'email' && <p className={styles.fieldError}>{error}</p>}
        {loading && <Spinner />}
      </div>
    );
  },
);

export const EmailEditTitle = () => <>Email</>;
export const EmailEditSubmitButton = () => <>Save</>;
