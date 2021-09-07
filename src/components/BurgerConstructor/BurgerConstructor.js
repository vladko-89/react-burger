import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import update from 'immutability-helper';
import { useDrop } from "react-dnd";
import { ConstructorElement, CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { uuid } from '../../utils/utils';
import { postOrder } from '../../systems/actions/index';
import { CLEAR_INGREDIENT_INFO,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  ADD_INGREDIENT_IN_ORDER,
  DELETE_INGREDIENT_FROM_ORDER,
  INGREDIENT_COUNT_INCREMENT,
  DELETE_BUN_FROM_CONSTRUCTOR,
  INGREDIENT_COUNT_CLEAR,
  POST_ORDER_ERROR,
  SORT_INGREDIENTS_IN_CONSTRUCTOR,
  CALCULATE_COAST } from '../../systems/actions/index';
import FilingConstructor from '../FilingConstructor/FilingConstructor'
import styles from './BurgerConstructor.module.css';

const BurgerConstructor = ({ onClick }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { ingredients, ingredientsConstructor, error, coast, user } = useSelector(store => ({
    ingredients: store.ingredients.ingredients,
    ingredientsConstructor: store.burgerConstructor.items,
    error: store.order.orderError,
    coast: store.order.coast,
    user: store.user.userData
  }));

  const [{isHover}, refTarget] = useDrop({
    accept: 'items',
    drop(card) {
      const item = createId(ingredients.find(item => item._id === card._id));
      if (item.type === 'bun' && ingredientsConstructor.some(item => item.type === 'bun')) {
        dispatch({
          type: DELETE_BUN_FROM_CONSTRUCTOR
        })
        dispatch({type: INGREDIENT_COUNT_CLEAR})
        dispatch({type: DELETE_INGREDIENT_FROM_ORDER, id: item._id})
      }
      dispatch({
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        item: item
      })
      dispatch({type: ADD_INGREDIENT_IN_ORDER, id: item._id})
      dispatch({type: INGREDIENT_COUNT_INCREMENT, id: item._id, counter: item.type === 'bun' ? 2 : 1})
    },
    collect: monitor => ({
        isHover: monitor.isOver(),
    })
  });

  const border = isHover ? '2px solid lightgreen' : '2px solid transparent';

  function createId(item) {
      return  {...item, uuid: uuid()}
  }

  const handleClickSendOrder = () => {
    dispatch({
      type: CLEAR_INGREDIENT_INFO
    });
    const data = [];
    ingredientsConstructor.forEach((item) => {data.push(item._id)});
    if (data.length > 0) {
      onClick();
      dispatch(postOrder(data));
    } else {
      dispatch({type: POST_ORDER_ERROR})
    }
  }

  useEffect(() => {
    dispatch({type: CALCULATE_COAST, items: ingredientsConstructor})
  }, [ingredientsConstructor, dispatch])

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = ingredientsConstructor[dragIndex];
    const newData = update(ingredientsConstructor, {
        $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
        ],
    });
    dispatch({ type: SORT_INGREDIENTS_IN_CONSTRUCTOR, data: newData})
  }, [ingredientsConstructor, dispatch]);

    return (
    <section className="mt-3 mb-13">
      <ul className={`${styles.ingredients} mb-10 pr-4 pl-4`} ref={refTarget} style={{border}}>
        <li className={`${styles.ingredient} ml-6 mb-2`}>
        {ingredientsConstructor.filter(item => item.type === 'bun').length > 0 && ingredientsConstructor.filter(item => item.type === 'bun').map((item) => (
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
            {ingredientsConstructor.filter(item => item.type === 'sauce' || item.type === 'main').length > 0 && ingredientsConstructor.filter(item => item.type === 'sauce' || item.type === 'main').map((item, index)=> (
              <FilingConstructor key={item.uuid} moveCard={moveCard} id={item.uuid} item={item} index={index+1} />
            ))
            }
          </ul>
        </li>
        <li className={`${styles.ingredient} ml-6`}>
        {ingredientsConstructor.filter(item => item.type === 'bun').length > 0 && ingredientsConstructor.filter(item => item.type === 'bun').map((item) => (
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
      {error && <p className={`${styles.constructor__error} text text_type_main-medium`}>Чтобы сделать заказ, соберите свой бургер!</p>}
        <div className={`${styles.constructor__wrapper} mb-13`}>
          <div className={`${styles.constructor__wrapper} mr-10`}>
            <p className="text text_type_digits-medium">{coast}</p>
            <CurrencyIcon type="primary" />
          </div>
          {user
          ?
            <Button type="primary" size="large" onClick={handleClickSendOrder}>
              Оформить заказ
            </Button>
          :
            <Button type="primary" size="large" onClick={() => history.push('/login')}>
              Войти
            </Button>
          }
        </div> 
    </section>
  )
}

BurgerConstructor.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default BurgerConstructor;