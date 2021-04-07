import { ReactNode } from 'react';
import { classNames } from 'shared/utils/elementutil';
import styles from './notification.module.scss';

export enum NotificationType {
  Normal = 'normal',
  Info = 'info',
}

interface NotificationProps {
  type?: NotificationType;
  className?: string;
  children?: ReactNode;
}
export const Notification = (props: NotificationProps) => {
  const { type, className, children } = props;

  return (
    <div className={classNames(styles.component, className)} data-type={type}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
