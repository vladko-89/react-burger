import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { uuid } from '../../utils/utils';
import { IngredientsContext } from '../../context/ingredientsContext';
import styles from './BurgerConstructor.module.css';

const BurgerConstructor = ({ onClick }) => {
  const [totalCoast, setTotalCoast] = React.useState(0);
  const ingredientsConstructor = React.useContext(IngredientsContext);

  function createId(arr) {
    
    return  arr.map((item) => (
      {...item, uuid: uuid()}
    ))
  }

  const handleClickSendOrder = () => {
    const data = [];
    ingredientsConstructor.forEach((item) => {data.push(item._id)});
    onClick(data);
  }


  const calculateTotalCoast = React.useCallback(() => {
    const coast = ingredientsConstructor.reduce((acc, item) => acc += item.price, 0);
    setTotalCoast(coast);
  }, [ingredientsConstructor])

  React.useEffect(() => {
    calculateTotalCoast();
  }, [calculateTotalCoast])


  return (
    <section className="mt-3 mb-13">
      <ul className={`${styles.ingredients} mb-10 pr-4 pl-4`}>
        <li className={`${styles.ingredient} ml-6 mb-2`}>
          {createId(ingredientsConstructor).slice(0, 1).map((item) => (
            <ConstructorElement
              key={item.uuid}
              type="top"
              isLocked={true}
              text={`${item.name} (верх)`}
              price={item.price}
              thumbnail={item.image_mobile}
            />
          ))}
        </li>
        <li className={`${styles.ingredient} mb-2`}>
          <ul className={`${styles.fillings}`}>
            {createId(ingredientsConstructor).slice(2, ingredientsConstructor.length-1).map((item)=> (
              <li className={`${styles.filling} mb-2`} key={item.uuid}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image_mobile}
                />
              </li>
            ))}
          </ul>
        </li>
        <li className={`${styles.ingredient} ml-6`}>
          {createId(ingredientsConstructor).slice(0, 1).map((item) => (
            <ConstructorElement
              key={item.uuid}
              type="bottom"
              isLocked={true}
              text={`${item.name} (низ)`}
              price={item.price}
              thumbnail={item.image_mobile}
            />
          ))}
        </li>
      </ul>
      <div className={`${styles.constructor__wrapper} mb-13`}>
        <div className={`${styles.constructor__wrapper} mr-10`}>
          <p className="text text_type_digits-medium">{totalCoast}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={handleClickSendOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default BurgerConstructor;