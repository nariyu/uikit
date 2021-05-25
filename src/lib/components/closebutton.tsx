import { classNames } from 'lib/utils/elementutil';
import { HTMLAttributes } from 'react';
import styles from './closebutton.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  color?: 'white';
}
export const CloseButton = (props: Props) => {
  const { color, className: cn } = props;

  return (
    <div
      {...props}
      className={classNames(cn, styles.component)}
      data-color={color}
    ></div>
  );
};
