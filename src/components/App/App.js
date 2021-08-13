import React, { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from 'react-redux';

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { getIngredients } from '../../systems/actions/index';
import { CLEAR_ORDER, CLEAR_CONSTRUCTOR } from '../../systems/actions/index';
import styles from './App.module.css';

function App() {
  const [modalOrder, setModalOrder] = React.useState(false);
  const dispatch = useDispatch();
  
  const [modalIngredientsDetailsIsOpened, setModalIngredientsDetailsIsOpened] = React.useState(false);
  const [modalOrderDetailsIsOpened, setModalOrderDetailsIsOpened] = React.useState(false);

  const handleClickOnCard = () => {
    setModalIngredientsDetailsIsOpened(true);
  }

  const handleCloseModal = () => {
    setModalOrderDetailsIsOpened(false);
    setModalIngredientsDetailsIsOpened(false);
    if (modalOrder) {
      dispatch({type: CLEAR_ORDER});
      dispatch({type: CLEAR_CONSTRUCTOR});
      setModalOrder(false);
    }
  }


  const handleClickOnButton = () => {
    setModalOrder(true);
    setModalOrderDetailsIsOpened(true);
  }

  
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
      <div className={`${styles.app}`}>
        <AppHeader />
        <DndProvider backend={HTML5Backend}>
          <main className={`${styles.main} pb-13`}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div className={`${styles.main__container}`}>
            <BurgerIngredients
              onClick={handleClickOnCard}
            />      
              <BurgerConstructor
                onClick={handleClickOnButton}
              />
            </div>
          </main>
        </DndProvider>
        <IngredientDetails
          modalOrder={modalOrder}
          isOpened={modalIngredientsDetailsIsOpened}
          onClose={handleCloseModal}
        />
        <OrderDetails
          modalOrder={modalOrder}
          isOpened={modalOrderDetailsIsOpened}
          onClose={handleCloseModal}
        />
    </div>
  );
}

export default App;
