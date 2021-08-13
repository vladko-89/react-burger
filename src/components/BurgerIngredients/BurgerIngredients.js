import React from 'react';
import PropTypes from 'prop-types';
import styles from "./BurgerIngredients.module.css";
import Tabs from '../Tabs/Tabs';
import IngredientsList from '../IngredientsList/IngredientsList';
import { IngredientsContext } from '../../context/ingredientsContext';

function BurgerIngredients({ onClick }) {

  const ingredientsConstructor = React.useContext(IngredientsContext);
  const buns = ingredientsConstructor.filter(item => item.type === "bun");
  const sauces = ingredientsConstructor.filter(item => item.type === "sauce");
  const fillings = ingredientsConstructor.filter(item => item.type === "main");
  return (
    <section className={`${styles.ingredients} mr-10`}>
      <Tabs />
      <ul className={`${styles.ingredients__groups}`}>
        <li className={`${styles.ingredients__group}`}>
          <IngredientsList
            title="Булки"
            cards={buns}
            onClick={onClick}
            />
        </li>
        <li className={`${styles.ingredients__group}`}>
          <IngredientsList
            title="Соусы"
            cards={sauces}
            onClick={onClick}
          />
        </li>
        <li className={`${styles.ingredients__group}`}>
          <IngredientsList
            title="Начинки"
            cards={fillings}
            onClick={onClick}
          />
        </li>
      </ul>
    </section>
  )
}

BurgerIngredients.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default BurgerIngredients;
