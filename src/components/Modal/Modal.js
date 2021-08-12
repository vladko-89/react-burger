import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CLEAR_ORDER, CLEAR_CONSTRUCTOR } from '../../systems/actions/index';

const modalRoot = document.getElementById('modal-root');

const Modal = ({isOpened, children, onClose, modalOrder=false }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!isOpened) return;
    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        onClose();
        
        modalOrder && 
        dispatch({type: CLEAR_ORDER});
        dispatch({type: CLEAR_CONSTRUCTOR});
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
      modalOrder={modalOrder}
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