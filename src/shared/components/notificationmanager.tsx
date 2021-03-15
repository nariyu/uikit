import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './notificationmanager.module.scss';

export enum NotificationType {
  Normal = 'normal',
  Info = 'info',
}

let currentNotify: HTMLElement | undefined;

export class NotificationManager {
  public static add(
    text: string,
    type = NotificationType.Normal,
    duration = 1500,
  ) {
    const notification = <Notification type={type}>{text}</Notification>;

    const container = document.createElement('div');
    container.className = styles.notifyContainer;

    if (currentNotify) {
      const rect = currentNotify.getBoundingClientRect();
      container.style.top = `${rect.top + rect.height + 15}px`;
    } else {
      container.style.top = `15px`;
    }
    currentNotify = container;

    document.body.appendChild(container);

    ReactDOM.render(notification, container);

    window.setTimeout(() => {
      this.close(container);
      if (currentNotify === container) currentNotify = undefined;
    }, duration);
  }

  public static close(container: HTMLElement) {
    container.classList.add(styles.closed);
    window.setTimeout(() => {
      ReactDOM.unmountComponentAtNode(container);
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }, 300);
  }
}

interface Props {
  children?: ReactNode;
  type: NotificationType;
}
const Notification = (props: Props) => {
  const { type, children } = props;

  return (
    <div className={styles.notify} data-type={type}>
      {children}
    </div>
  );
};
