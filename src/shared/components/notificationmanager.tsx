import ReactDOM from 'react-dom';
import { Notification, NotificationType } from './notification';
import styles from './notificationmanager.module.scss';

let currentNotify: HTMLElement | undefined;
let currentCloseHandler: (() => void) | undefined;

export class NotificationManager {
  public static add(
    text: string,
    type = NotificationType.Normal,
    duration = 5000,
  ) {
    const notification = (
      <Notification type={type} className={styles.notification}>
        {text}
      </Notification>
    );

    const container = document.createElement('div');
    container.className = styles.notifyContainer;

    currentNotify = container;

    document.body.appendChild(container);

    ReactDOM.render(notification, container);

    let closeTimer = 0;

    if (currentCloseHandler) {
      currentCloseHandler();
    }
    const close = () => {
      if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = 0;
      }
      this.close(container);
    };
    currentCloseHandler = close;

    closeTimer = window.setTimeout(close, duration);
  }

  public static close(container: HTMLElement) {
    container.classList.add(styles.closed);
    if (currentNotify === container) currentNotify = undefined;
    window.setTimeout(() => {
      ReactDOM.unmountComponentAtNode(container);
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }, 500);
  }
}
