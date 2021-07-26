import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import api from '../../utils/api';
import styles from './App.module.css';

function App() {
  const [ingredients, setIngredients] = React.useState([]);
  const [currentCard, setCurrentCard] = React.useState(null);
  const [modalIsOpened, setModalIsOpened] = React.useState(false);
  const [counterOrders, setCounterOrders] = React.useState(0);

  const handleClickOnCard = (obj) => {
    setCurrentCard(obj);
    setModalIsOpened(true);
  }

  const handleClickOnButton = () => {
    setCurrentCard(null);
    setCounterOrders(counterOrders + 1);
    setModalIsOpened(true);
  }

  const handleCloseModal = () => {
    setModalIsOpened(false);
  }



  const getIngredients = () => {
    api.getIngredients()
    .then(res => setIngredients(res.data))
    .catch(error => console.log(error));
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
        <BurgerConstructor
          onClick={handleClickOnButton}
        />
        </div>
      </main>
      <ModalOverlay
        card={currentCard}
        counter={counterOrders}
        isOpened={modalIsOpened}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
