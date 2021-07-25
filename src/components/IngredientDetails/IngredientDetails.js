import React from 'react';
import { card } from '../../utils/data';
import qwerty from '../IngredientDetails/IngredientDetails.module.css';

const IngredientDetails = ({card}) => {
  return (
    <div className={`${qwerty.content} pt-10 pl-10 pb-15`}>
      <h2 className={`${qwerty.title} text text_type_main-large`}>Детали ингредиента</h2>
      <img className={`${qwerty.container__image} mb-4`} src={card.image_large} alt={`Изображение 4{card.name}`} />
      <p className="text text_type_main-medium mb-8">{card.name}</p>
      <ul className={`${qwerty.container__attributes} mb-15`}>
        <li className={`${qwerty.container__attribute}`}>
          <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
          <p className={`${qwerty.value} text text_type_digits-default text_color_inactive`}>{card.calories}</p>
        </li>
        <li className={`${qwerty.container__attribute} ml-5`}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className={`${qwerty.value} text text_type_digits-default text_color_inactive`}>{card.proteins}</p>
        </li>
        <li className={`${qwerty.container__attribute} ml-5`}>
          <p className="text text_type_main-default text_color_inactive">Жири, г</p>
          <p className={`${qwerty.value} text text_type_digits-default text_color_inactive`}>{card.fat}</p>
        </li>
        <li className={`${qwerty.container__attribute} ml-5`}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className={`${qwerty.value} text text_type_digits-default text_color_inactive`}>{card.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  card: card.isRequired
}

export default IngredientDetails;
