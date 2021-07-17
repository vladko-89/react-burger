import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredients-list.module.css';
import IngredientCard from '../ingredient-card/ingredient-card'
import { card } from '../../utils/data';

const IngredientsList = ({title, cards}) => {
  return (
    <section className={`${styles.ingredients}`}>
      <h2 className={`${styles.ingredients__title} text text_type_main-medium mt-10 mb-6`}>{title}</h2>
      <ul className={`${styles.ingredients__list} ml-4 pr-4`}>
      {cards.map((card) => (
        <li className={`${styles.ingredients__item}`} key={card._id}>
          <IngredientCard card={card}/>
        </li>
      ))}
      </ul>
    </section>
    
  )
}

IngredientsList.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({
    card: card
  }))
}

export default IngredientsList;