import { HTMLAttributes, ReactNode } from 'react';
import styles from './button.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
export const Button = (props: Props) => {
  const { children } = props;
  return (
    <div className={styles.component} {...props}>
      {children}
    </div>
  );
};
