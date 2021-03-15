import ReactDOM from 'react-dom';
import { preventDefault } from 'shared/utils/elementutil';
import styles from './popupmanager.module.scss';

export class PopupManager {
  private static modals: {
    modal: JSX.Element;
    enabledCloseByBackground: boolean;
  }[] = [];
  private static modalContainer: HTMLElement;
  private static modalExists = false;

  public static open(modal: JSX.Element, enabledCloseByBackground = false) {
    this.modals.push({ modal, enabledCloseByBackground });

    if (this.modals.length === 1) {
      this.renderModal();
    }
  }

  public static close() {
    const modalContainer = this.modalContainer;
    if (modalContainer) {
      this.modals.shift();
      modalContainer.classList.add(styles.closed);
      window.setTimeout(() => {
        ReactDOM.unmountComponentAtNode(modalContainer);
        if (modalContainer.parentNode) {
          modalContainer.parentNode.removeChild(modalContainer);
        }
        this.modalExists = false;
        this.renderModal();
      }, 300);
    }
  }

  private static renderModal() {
    if (this.modalExists) return;
    const modal = this.modals[0];
    if (modal) {
      this.modalExists = true;
      const modalContainer = document.createElement('div');
      modalContainer.className = styles.modalContainer;
      this.modalContainer = modalContainer;

      document.body.appendChild(modalContainer);

      ReactDOM.render(
        <>
          <div
            className={styles.modalContainerBackground}
            onClick={(event) => {
              preventDefault(event);
              if (modal.enabledCloseByBackground) {
                this.close();
              }
            }}
          />
          {modal.modal}
        </>,
        this.modalContainer,
      );
    }
  }
}
