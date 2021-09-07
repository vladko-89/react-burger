import React, { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from 'react-redux';
import AppHeader from '../AppHeader/AppHeader';
import {getUserInfo, getIngredients} from '../../systems/actions'
import ModalSwitch from '../ModalSwitch/ModalSwitch'
import styles from './App.module.css';

function App() {
  const {user} = useSelector(store => ({
    user: store.user.userData
  }))
  
  const dispatch = useDispatch();



useEffect(() => {
  if (localStorage.getItem('token') && user === null) {
    dispatch(getUserInfo())
  }
}, [dispatch, user])

useEffect(() => {
  dispatch(getIngredients());
}, [dispatch])



  return (
      <div className={`${styles.app}`}>
        <AppHeader />
        <DndProvider backend={HTML5Backend}>
          <main className={`${styles.main} pb-13`}>
          <ModalSwitch />
          </main>
        </DndProvider>

    </div>
  );
}

export default App;
