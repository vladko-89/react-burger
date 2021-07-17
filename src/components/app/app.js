import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';

function App() {
  return (
    <div className={`${styles.app}`}>
      <AppHeader />
      <main className={`${styles.main} pb-13`}>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <div className={`${styles.main__container}`}>
        <BurgerIngredients />
        <BurgerConstructor />
        </div>
        
      </main>
    </div>
  );
}

export default App;
