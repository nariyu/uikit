import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { Notification, NotificationType } from './notification';
import styles from './notificationmanager.module.scss';

type CloseFunction = (forceClose?: boolean) => void;
let currNotify: HTMLElement | undefined;
let currCloseFunc: CloseFunction | undefined;

export class NotificationManager {
  /** add notification */
  public static add(
    text: ReactNode,
    type = NotificationType.Normal,
    duration = 5000,
  ) {
    let closeTimer = 0;

    const closeFunc: CloseFunction = (forceClose = false) => {
      if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = 0;
      }
      this.close(container, forceClose);
      forceClose = null;
    };

    const notification = (
      <Notification type={type} onClose={closeFunc}>
        {text}
      </Notification>
    );

    const container = document.createElement('div');
    container.className = styles.notifyContainer;

    currNotify = container;

    document.body.appendChild(container);

    ReactDOM.render(notification, container);

    if (currCloseFunc) {
      currCloseFunc(true);
    }
    currCloseFunc = closeFunc;
    closeTimer = window.setTimeout(closeFunc, duration);

    return closeFunc;
  }

  /** close */
  public static close(container: HTMLElement, forceClose = false) {
    window.setTimeout(
      () => {
        if (forceClose) {
          container.classList.add(styles.fadeOut);
        }
        container.classList.add(styles.closed);
        if (currNotify === container) currNotify = undefined;
        window.setTimeout(() => {
          ReactDOM.unmountComponentAtNode(container);
          if (container.parentNode) {
            container.parentNode.removeChild(container);
          }
        }, 500);
      },
      forceClose ? 200 : 0,
    );
  }
}
