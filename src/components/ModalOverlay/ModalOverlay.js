import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { card } from '../../utils/data';
import styles from './ModalOverlay.module.css';
import Modal from '../Modal/Modal';

const modalRoot = document.getElementById('modal-root');

const ModalOverlay = ({isOpened, card = null, counter, onClose }) => {

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

  const handleOverlayClose = (event) => {
    if (event.target === event.currentTarget && isOpened) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className={`${styles.modal} ${isOpened && styles.modal_show}`}
      onMouseDown={handleOverlayClose}
    >
      <Modal
        onClose={onClose}
        counter={counter}
        card={card}
      />
    </div>, modalRoot
  )
}

ModalOverlay.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  counter: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  card: card
}

export default ModalOverlay;