import React from 'react';
import { useSelector } from 'react-redux';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';
import styles from '../IngredientDetails/IngredientDetails.module.css';

const IngredientDetails = ({isOpened, onClose}) => {

  const { card } = useSelector(store => ({
    card: store.currentIngredient
  }));

  if (card !== null) {
    return (
      <Modal isOpened={isOpened} onClose={onClose}>
        <div className={`${styles.content} pt-10 pl-10 pb-15`}>
          <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
          <img className={`${styles.container__image} mb-4`} src={card.image_large} alt={`Изображение ${card.name}`} />
          <p className="text text_type_main-medium mb-8">{card.name}</p>
          <ul className={`${styles.container__attributes} mb-15`}>
            <li className={`${styles.container__attribute}`}>
              <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
              <p className={`${styles.value} text text_type_digits-default text_color_inactive`}>{card.calories}</p>
            </li>
            <li className={`${styles.container__attribute} ml-5`}>
              <p className="text text_type_main-default text_color_inactive">Белки, г</p>
              <p className={`${styles.value} text text_type_digits-default text_color_inactive`}>{card.proteins}</p>
            </li>
            <li className={`${styles.container__attribute} ml-5`}>
              <p className="text text_type_main-default text_color_inactive">Жири, г</p>
              <p className={`${styles.value} text text_type_digits-default text_color_inactive`}>{card.fat}</p>
            </li>
            <li className={`${styles.container__attribute} ml-5`}>
              <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
              <p className={`${styles.value} text text_type_digits-default text_color_inactive`}>{card.carbohydrates}</p>
            </li>
          </ul>
        </div>
      </Modal>
    )
  }
  return (<> </>)
  
}

IngredientDetails.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default IngredientDetails;
