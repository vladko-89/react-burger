import React from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderButton from '../header-button/header-button';
import styles from './app-header.module.css';

function AppHeader() {
  const [current, setCurrent] = React.useState('Конструктор')

  function handleClick(str) {
    setCurrent(str);
  }

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={`${styles.container}`}>
        <ul className={`${styles.menu} ${styles.header__navigation}`}>
          <li className={`${styles.menu__item} mr-2`}>
            <HeaderButton 
              onSetCurrent={handleClick}
              component={BurgerIcon}
              text='Конструктор'
              active={current} 
            />
          </li>
          <li className="menu__item">
            <HeaderButton 
              onSetCurrent={handleClick}
              component={ListIcon}
              active={current}
              text='Лента заказов' 
            />
          </li>
        </ul>
        <Logo />
        <HeaderButton
          onSetCurrent={handleClick}
          active={current}
          component={ProfileIcon}
          text='Личный кабинет'
        />
      </div>
    </header>
  )
}

export default AppHeader;