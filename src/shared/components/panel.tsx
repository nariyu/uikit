import { ReactNode } from 'react';
import styles from './panel.module.scss';

interface PanelProps {
  hidden?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  headerContent?: ReactNode;
  footerContent?: ReactNode;
}
export const Panel = (props: PanelProps) => {
  const { hidden, disabled, children, headerContent, footerContent } = props;

  return (
    <div className={styles.modal} aria-hidden={hidden}>
      <div className={styles.component} data-disabled={disabled}>
        {headerContent && <div className={styles.header}>{headerContent}</div>}
        <div className={styles.body}>
          <div className={styles.content}>{children}</div>
        </div>
        {footerContent && <div className={styles.footer}>{footerContent}</div>}
      </div>
    </div>
  );
};
