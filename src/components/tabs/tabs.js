import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs.module.css';

const Tabs = () => {
  const [current, setCurrent] = React.useState('breads');

  function handleClick(str) {
    setCurrent(str);
  }

  return (
    <div className={`${styles.tabs}`}>
      <Tab value="breads" active={current === 'breads'} onClick={(value) => handleClick(value)}>
        Булки
      </Tab>
      <Tab value="sauces" active={current === 'sauces'} onClick={(value) => handleClick(value)}>
        Соусы
      </Tab>
      <Tab value="fillings" active={current === 'fillings'} onClick={(value) => handleClick(value)}>
        Начинки
      </Tab>
    </div>
  )
}

export default Tabs;
