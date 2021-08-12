import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styles from './ModalOverlay.module.css';
import { CLEAR_ORDER, CLEAR_CONSTRUCTOR } from '../../systems/actions/index';


const ModalOverlay = ({isOpened, onClose, children, modalOrder }) => {
  const dispatch = useDispatch();
  
  const handleOverlayClose = (event) => {
    if (event.target === event.currentTarget && isOpened) {
      onClose();
      modalOrder && 
        dispatch({type: CLEAR_ORDER});
        dispatch({type: CLEAR_CONSTRUCTOR});
    }
  };
  return (
  <div
    className={`${styles.modal} ${isOpened && styles.modal_show}`}
    onMouseDown={handleOverlayClose}>
    {children}
  </div>
  )
}

ModalOverlay.propTypes = {
  modalOrder: PropTypes.bool,
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default ModalOverlay;
