import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { card } from '../../utils/data';
import styles from './Modal.module.css';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import ModalOverlay from '../ModalOverlay/ModalOverlay'

const modalRoot = document.getElementById('modal-root');

const Modal = ({isOpened, card = null, counter, onClose }) => {

  React.useEffect(() => {
    if (!isOpened) return;
    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [isOpened, onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay
      isOpened={isOpened}
      onClose={onClose}
    >
      <div className={`${styles['modal-body']}`}>
        <button type="button" onClick={onClose} className={`${styles.close}`} />
        {
          card === null
          ?
            <OrderDetails counter={counter} />
          :
            <IngredientDetails card={card} />
        }
      </div>
    </ModalOverlay>, modalRoot
  )
}

Modal.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  counter: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  card: card
}

export default Modal;