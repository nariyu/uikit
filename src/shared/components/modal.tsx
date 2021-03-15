import { ReactNode, SyntheticEvent, useCallback, useState } from 'react';
import { classNames, preventDefault } from 'shared/utils/elementutil';
import { Button } from './button';
import style from './modal.module.scss';
import { ModalManager } from './modalmanager';

interface ButtonProps {
  label: string;
  primary?: boolean;
  onClick?: () => Promise<unknown> | void;
}
interface Props {
  children?: ReactNode;
  onClose?: () => void;
  buttons?: ButtonProps[];
}
export const Modal = (props: Props) => {
  const { children, onClose, buttons } = props;

  const [closed, setClosed] = useState(false);

  /** OK */
  const onClickButton = useCallback(
    (event: SyntheticEvent<HTMLElement>) => {
      preventDefault(event);

      let promise: Promise<unknown> | undefined;

      const indexStr = event.currentTarget.getAttribute('data-index');
      if (typeof indexStr === 'string') {
        const index = parseInt(indexStr, 10);
        if (buttons) {
          const button = buttons[index];
          if (button && button.onClick) {
            const p = button.onClick();
            if (p) {
              promise = p;
            }
          }
        }
      }

      if (onClose) {
        onClose();
      }

      setClosed(true);
      if (promise) {
        promise.finally(() => {
          ModalManager.close();
        });
      } else {
        ModalManager.close();
      }
    },
    [onClose, buttons],
  );

  const hasPrimary = buttons
    ? !!buttons.find((button) => button.primary)
    : false;

  return (
    <div
      className={classNames(style.component, closed ? style.closed : undefined)}
      onClick={(event) => preventDefault(event)}
    >
      <div className={style.content}>{children}</div>

      <div className={style.footer}>
        {buttons ? (
          buttons.map((button, index) => (
            <Button
              key={index}
              data-index={index}
              data-secondary={hasPrimary && !button.primary ? true : undefined}
              data-primary={button.primary ? true : undefined}
              onClick={onClickButton}
            >
              {button.label}
            </Button>
          ))
        ) : (
          <Button onClick={onClickButton}>OK</Button>
        )}
      </div>
    </div>
  );
};
