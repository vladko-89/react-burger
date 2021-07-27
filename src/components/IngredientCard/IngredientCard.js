import React from 'react';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import { card } from '../../utils/data';
import styles from './IngredientCard.module.css';

const IngredientCard = ({card, onClick}) => {


  return (
    <article className={`${styles.card}`} onClick={() => onClick(card)}>
      <Counter count={1} size="default" />
      <img src={card.image} className={`${styles.card__image}`} alt={card.name} />
      <div className={`${styles["card__price-wrapper"]} mt-1 mb-1`}>
        <p className="text text_type_digits-default mr-1">{card.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <h3 className="text text_type_main-default">{card.name}</h3>
    </article>
  )
}

IngredientCard.propTypes = {
  card: card.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default IngredientCard;