import styles from "./ErrorModal.module.css";
import { IErrorProps } from "../../Interfaces/IAuthModel";

const ErrorModal = (props: IErrorProps) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalbody}>
        <h1 className={styles.header}>{props.title}</h1>
        <p className={styles.info}>{props.message}</p>
        <div className={styles.return}>
          <button onClick={props.onConfirm}>Return</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
