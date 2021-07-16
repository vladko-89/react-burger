import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import './App.css';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className="main pb-13">
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <div className="main__container">
        <BurgerIngredients />
        <BurgerConstructor />
        </div>
        
      </main>
    </div>
  );
}

export default App;
