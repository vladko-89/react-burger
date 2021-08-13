import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from './OrderDetails.module.css';
import { getStringOrder } from '../../utils/utils';
import check  from '../../images/done.png';
import Modal from '../Modal/Modal';


const OrderDetails = ({isOpened, onClose, modalOrder}) => {
  const { number } = useSelector(store => ({
    number: store.order.orderNumber,
  }))
  
  

  const handleClose = () => {
    onClose();
    
  }
    return (
    <Modal isOpened={isOpened} onClose={handleClose} modalOrder={modalOrder}>
      <div className={`${styles.container__content} pb-30 pt-20`}>
        <p className={`${styles['order-number']} text text_type_digits-large mb-8`}>{getStringOrder(number)}</p>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
        <img className={`${styles.container__icon} mb-15`} src={check} alt="Иконка" />
        <p className="text text_type_main-small ">Ваш заказ начали готовить</p>
        <p className="text text_type_main-small text_color_inactive mt-2 ">Дождитесь готовности на орбитальной станции</p>
      </div>
    </Modal>
    
  )
}

OrderDetails.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  modalOrder: PropTypes.bool.isRequired
}

export default OrderDetails;
