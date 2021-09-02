import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";
import { Counter, CurrencyIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import { card } from '../../utils/data';
import { GET_INGREDIENT_INFO } from '../../systems/actions/index'
import styles from './IngredientCard.module.css';

const IngredientCard = ({card, onClick}) => {
  const { _id } = card;
  const dispatch = useDispatch();
  const location = useLocation();

  const handleClick = () => {
    console.log(location)
    dispatch({
      type: GET_INGREDIENT_INFO,
      item: card
    })
    onClick();
  }

  const [{ opacity }, ref] = useDrag({
    type: 'items',
    item: { _id },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    
      <article
        className={`${styles.card}`}
        onClick={handleClick}
        ref={ref}
        style={{ opacity }}
        >
        {card.counter > 0 && <Counter count={card.counter} size="default" />}
        <img src={card.image} className={`${styles.card__image}`} alt={card.name} />
        <div className={`${styles["card__price-wrapper"]} mt-1 mb-1`}>
          <p className={`${styles.card__price} text text_type_digits-default mr-1`}>{card.price}</p>
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