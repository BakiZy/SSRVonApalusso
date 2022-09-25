import styles from "./ErrorModal.module.css";
import { Button, Card } from "react-bootstrap";
import { IErrorProps } from "../../Interfaces/IAuthModel";

const ErrorModal = (props: IErrorProps) => {
  return (
    <div>
      <Card className={styles.modal}>
        <Card.Body className={styles.modalbody}>
          <Card.Title className={styles.header}>{props.title}</Card.Title>
          <Card.Text className={styles.info}>{props.message}</Card.Text>
          <div className={styles.return}>
            <Button variant="dark" onClick={props.onConfirm}>
              Return
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ErrorModal;
