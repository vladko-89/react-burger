import React from 'react';
import PropTypes from 'prop-types';
import { card } from '../../utils/data';
import styles from './Modal.module.css';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';

const Modal = ({card = null, counter, onClose }) => {
  return (
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
  )
}

Modal.propTypes = {
  counter: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  card: card
}

export default Modal;
