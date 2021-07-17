import React from 'react';
import styles from "./burger-ingredients.module.css";
import Tabs from '../tabs/tabs';
import IngredientsList from '../ingredients-list/ingredients-list'
import { data } from '../../utils/data';

function BurgerIngredients() {
  const buns = data.filter(item => item.type === "bun");
  const sauces = data.filter(item => item.type === "sauce");
  const fillings = data.filter(item => item.type === "main");
  return (
    <section className={`${styles.ingredients} mr-10`}>
      <Tabs />
      <ul className={`${styles.ingredients__groups}`}>
        <li className={`${styles.ingredients__group}`}>
          <IngredientsList title="Булки" cards={buns}/>
        </li>
        <li className={`${styles.ingredients__group}`}>
          <IngredientsList title="Соусы" cards={sauces}/>
        </li>
        <li className={`${styles.ingredients__group}`}>
          <IngredientsList title="Начинки" cards={fillings}/>
        </li>
      </ul>
    </section>
  )
}

export default BurgerIngredients;
