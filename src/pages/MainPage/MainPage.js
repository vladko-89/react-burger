import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import styles from './MainPage.module.css'

const MainPage = ({handleClickOnButton, handleClickOnCard}) => {


    return(
        <>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div className={`${styles.main__container}`}>
                <BurgerIngredients onClick={handleClickOnCard} />      
                <BurgerConstructor onClick={handleClickOnButton} />
            </div>

        </>
    )
}

MainPage.propTypes = {
    handleClickOnButton: PropTypes.func.isRequired,
    handleClickOnCard: PropTypes.func.isRequired
}

export default MainPage;