import React, {useEffect} from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {useLocation} from 'react-router-dom';
import HeaderButton from '../HeaderButton/HeaderButton';
import styles from './AppHeader.module.css';

function AppHeader() {
  const [current, setCurrent] = React.useState('Конструктор')
  const location = useLocation();

useEffect(() => {
  if (location.pathname.startsWith('/profile')) {
    setCurrent('Личный кабинет')
  }
  if (location.pathname === '/') {
    setCurrent('Конструктор')
  }
}, [location])

  function handleClick(str) {
    setCurrent(str);
  }

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={`${styles.container}`}>
        <ul className={`${styles.menu} ${styles.header__navigation}`}>
          <li className={`${styles.menu__item} mr-2`}>
            <HeaderButton 
              path='/'
              onSetCurrent={handleClick}
              component={BurgerIcon}
              text='Конструктор'
              active={current} 
            />
          </li>
          <li className="menu__item">
            <HeaderButton
              path='/pppo'
              onSetCurrent={handleClick}
              component={ListIcon}
              active={current}
              text='Лента заказов' 
            />
          </li>
        </ul>
        <span className="mr-30"><Logo /></span>
        <HeaderButton
          path='/profile'
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