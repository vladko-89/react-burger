import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Tabs.module.css';

const Tabs = ({currentTab, onClick}) => {  

  return (
    <div className={`${styles.tabs}`}>
      <Tab value='buns' active={currentTab === 'buns'} onClick={(value) => onClick(value)}>
        Булки
      </Tab>
      <Tab value='sauces' active={currentTab === 'sauces'} onClick={(value) => onClick(value)}>
        Соусы
      </Tab>
      <Tab value='mains' active={currentTab === 'mains'} onClick={(value) => onClick(value)}>
        Начинки
      </Tab>
    </div>
  );
}

Tabs.propTypes = {
  currentTab: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Tabs;
