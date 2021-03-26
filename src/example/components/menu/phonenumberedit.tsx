import {
  forwardRef,
  RefObject,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useRecoilState } from 'recoil';
import { Submittable } from 'shared/components/navigationcontroller';
import { Popup } from 'shared/components/popup';
import { PopupManager } from 'shared/components/popupmanager';
import { Spinner } from 'shared/components/spinner';
import { TextInput, TextInputHandler } from 'shared/components/textinput';
import { classNames } from 'shared/utils/elementutil';
import { userInfoState } from '../../states/userinfostate';
import { validatePhoneNumber } from '../../validators';
import styles from './editpage.module.scss';

interface Props {
  onClose: () => void;
}
export const PhoneNumberEdit = forwardRef(
  (props: Props, ref: RefObject<Submittable>) => {
    const { onClose } = props;

    const [userInfo, setUserInfo] = useRecoilState(userInfoState);

    const phoneNumberTextInputRef = useRef<TextInputHandler>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [errorType, setErrorType] = useState<'' | 'phonenumber'>('');

    // OK
    const submit = useCallback(() => {
      setError('');
      setErrorType('');

      const phoneNumberTextInput = phoneNumberTextInputRef.current;
      if (!phoneNumberTextInput) return;

      const phoneNumber = phoneNumberTextInput.getValue();

      // バリデーション
      if (!phoneNumber) {
        setErrorType('phonenumber');
        setError('Please enter your phone number.');
        return;
      }
      if (!validatePhoneNumber(phoneNumber)) {
        setErrorType('phonenumber');
        setError('Please enter your phone number correctly.');
        return;
      }

      setLoading(true);

      new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        setLoading(false);
        setUserInfo((userInfo) => ({ ...userInfo, phoneNumber }));
        PopupManager.open(<Popup>Phone number is updated.</Popup>);
        onClose();
      });
    }, [onClose]);

    useImperativeHandle(ref, () => ({ submit }), [submit]);

    return (
      <div className={styles.component}>
        <div className={styles.field}>
          <TextInput
            ref={phoneNumberTextInputRef}
            name="phonenumber"
            label="Phone Number"
            placeholder="09012345678"
            pattern="\d*"
            defaultValue={userInfo.phoneNumber}
            disabled={loading}
            labelClassName={classNames(
              errorType === 'phonenumber' ? styles.errorLabel : undefined,
            )}
            inputClassName={classNames(
              errorType === 'phonenumber' ? styles.errorInput : undefined,
            )}
          />
        </div>
        {errorType === 'phonenumber' && (
          <p className={styles.fieldError}>{error}</p>
        )}
        {loading && <Spinner />}
      </div>
    );
  },
);

export const PhoneNumberEditTitle = () => <>Phone Number</>;
export const PhoneNumberEditSubmitButton = () => <>Save</>;
