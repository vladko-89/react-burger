import React, { useMemo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from "./BurgerIngredients.module.css";
import Preloader from '../Preloader/Preloader';
import Tabs from '../Tabs/Tabs';

import IngredientsList from '../IngredientsList/IngredientsList';

function BurgerIngredients({ onClick }) {
  const { ingredients, ingredientsRequest } = useSelector(store => ({
    ingredients: store.ingredients.ingredients,
    ingredientsRequest: store.ingredients.ingredientsRequest,
    ingredientsFailed: store.ingredients.ingredientsFailed
  }));

const [currentTab, setCurrentTab] = useState('buns');

function handleClick(str) {
  setCurrentTab(str);
}

  const containerRef = useRef();
  const bunsRef = useRef();
  const saucesRef = useRef();
  const mainsRef = useRef();

  const buns = ingredients.filter(item => item.type === "bun");
  const sauces = ingredients.filter(item => item.type === "sauce");
  const fillings = ingredients.filter(item => item.type === "main");

  const handleScroll = () => {     
    const containerPosition = containerRef.current.getBoundingClientRect().top;     
    const bunsHeaderPosition = bunsRef.current.getBoundingClientRect().top;     
    const sauceHeaderPosition = saucesRef.current.getBoundingClientRect().top;     
    const mainsHeaderPosition = mainsRef.current.getBoundingClientRect().top;     
    const bunsDiff = Math.abs(containerPosition - bunsHeaderPosition);     
    const sauceDiff = Math.abs(containerPosition - sauceHeaderPosition);     
    const mainsDiff = Math.abs(containerPosition - mainsHeaderPosition);      
    switch (true) {       
      case (bunsDiff < sauceDiff) && (bunsDiff < mainsDiff): {         
        setCurrentTab('buns'); break;       }       
      case (sauceDiff < bunsDiff) && (sauceDiff < mainsDiff): {         
        setCurrentTab('sauces'); break;       }       
      default: {         
        setCurrentTab('mains');       }     
    }   
  };


  useEffect(() => {
    if (!ingredientsRequest) {
      const containerScroll = document.querySelector(`.scroll-container`);
    
    containerScroll.addEventListener('scroll', handleScroll);
    return () => {
      containerScroll.removeEventListener('scroll', handleScroll);
    }
    }
    
  }, [ingredientsRequest])

  const content = useMemo(() => {
    return ingredientsRequest ? (
      <Preloader />
    ) : (
      <ul className={`${styles.ingredients__groups} scroll-container`} ref={containerRef}>
        <li className={`${styles.ingredients__group}`} ref={bunsRef}>
          <IngredientsList
            title="Булки"
            cards={buns}
            onClick={onClick}
            />
        </li>
        <li className={`${styles.ingredients__group}`} ref={saucesRef}>
          <IngredientsList
            title="Соусы"
            cards={sauces}
            onClick={onClick}
          />
        </li>
        <li className={`${styles.ingredients__group}`} ref={mainsRef}>
          <IngredientsList
            title="Начинки"
            cards={fillings}
            onClick={onClick}
          />
        </li>
      </ul>
      )
  }, [buns, fillings, ingredientsRequest, onClick, sauces]
);

  return (
    <section className={`${styles.ingredients} mr-10`}>
      <Tabs  currentTab={currentTab} onClick={handleClick}/>
      {content}
    </section>
  )
}

BurgerIngredients.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default BurgerIngredients;
