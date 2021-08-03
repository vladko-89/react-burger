import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import { IngredientsContext } from '../../context/ingredientsContext';

import api from '../../utils/api';
import styles from './App.module.css';

function App() {
  const [ingredients, setIngredients] = React.useState([]);
  
  const [currentCard, setCurrentCard] = React.useState(null);
  const [modalIngredientsDetailsIsOpened, setModalIngredientsDetailsIsOpened] = React.useState(false);
  const [modalOrderDetailsIsOpened, setModalOrderDetailsIsOpened] = React.useState(false);
  const [counterOrders, setCounterOrders] = React.useState(0);

  const handleClickOnCard = (obj) => {
    setCurrentCard(obj);
    setModalIngredientsDetailsIsOpened(true);
  }

  const handleCloseModal = () => {
    setModalOrderDetailsIsOpened(false);
    setModalIngredientsDetailsIsOpened(false);
  }

    const getIngredients = () => {
    api.getIngredients()
    .then(res => setIngredients(res.data))
    .catch(error => console.log(error));
  }

  const arrangeOrder = (data) => {
    console.log(data)
    api.createOrder(data)

    .then((res) => setCounterOrders(res.order.number))
    .then(() => {
      setCurrentCard(null);
      setModalOrderDetailsIsOpened(true);
    })
    .catch(error => console.log(error));
  }

  const handleClickOnButton = (data) => {
    arrangeOrder(data);
  }

  React.useEffect(() => {
    getIngredients();
  }, [])

  return (
    <div className={`${styles.app}`}>
      <AppHeader />
      <main className={`${styles.main} pb-13`}>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <div className={`${styles.main__container}`}>
        <BurgerIngredients
          ingredients={ingredients}
          onClick={handleClickOnCard}
        />
        <IngredientsContext.Provider value={ingredients}>
          <BurgerConstructor
            onClick={handleClickOnButton}
          />
        </IngredientsContext.Provider>
        </div>
      </main>
      <IngredientDetails
        card={currentCard}
        isOpened={modalIngredientsDetailsIsOpened}
        onClose={handleCloseModal}
      />
      <OrderDetails
        counter={counterOrders}
        isOpened={modalOrderDetailsIsOpened}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
