import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderDetails.module.css';
import { getStringOrder } from '../../utils/utils';
import check  from '../../images/done.png';

const OrderDetails = ({counter}) => {
  return (
    <div className={`${styles.container__content} pb-30 pt-20`}>
      <p className={`${styles['order-number']} text text_type_digits-large mb-8`}>{getStringOrder(counter)}</p>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img className={`${styles.container__icon} mb-15`} src={check} alt="Иконка" />
      <p className="text text_type_main-small ">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive mt-2 ">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

OrderDetails.propTypes = {
  counter:PropTypes.number.isRequired
}

export default OrderDetails;
