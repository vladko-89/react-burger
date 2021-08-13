import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';


const modalRoot = document.getElementById('modal-root');

const Modal = ({isOpened, children, onClose, modalOrder=false }) => {

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
        {children}
      </div>
    </ModalOverlay>, modalRoot
  )
}

Modal.propTypes = {
  modalOrder: PropTypes.bool,
  isOpened: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired

}

export default Modal;