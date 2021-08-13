import React from 'react';
import PropTypes from 'prop-types';
import styles from './ModalOverlay.module.css';

const ModalOverlay = ({isOpened, onClose, children }) => {

  
  const handleOverlayClose = (event) => {
    if (event.target === event.currentTarget && isOpened) {
      onClose();
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
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default ModalOverlay;
