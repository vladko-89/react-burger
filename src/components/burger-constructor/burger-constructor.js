import React from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredients } from '../../utils/data';
import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
  const [totalCoast, setTotalCoast] = React.useState(0);

  const calculateTotalCoast = () => {
    let coast = ingredients.reduce((acc, item) => acc += item.price, 0);
    setTotalCoast(coast);
  } 

  React.useEffect(() => {
    calculateTotalCoast();
  }, [])

  return (
    <section className="mt-3 mb-13">
      <ul className={`${styles.ingredients} mb-10 pr-4 pl-4`}>
        <li className={`${styles.ingredient} ml-8 mb-2`}>
          {ingredients.slice(0, 1).map((item) => (
            <ConstructorElement
              key={item.id}
              type="top"
              isLocked={true}
              text={item.name}
              price={item.price}
              thumbnail={item.image_mobile}
            />
          ))}
        </li>
        <li className={`${styles.ingredient} mb-2`}>
          <ul className={`${styles.fillings}`}>
            {ingredients.slice(1, ingredients.length-1).map((item)=> (
              <li className={`${styles.filling} mb-2`} key={item.id}>
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
        <li className={`${styles.ingredient} ml-8`}>
          {ingredients.slice(0, 1).map((item) => (
            <ConstructorElement
              key={item.id}
              type="bottom"
              isLocked={true}
              text={item.name}
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
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;