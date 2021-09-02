import React from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './NavBar.module.css';
import api from '../../utils/api';
import {CLEAR_USER_STORE} from '../../systems/actions'

const NavBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const handleExit = () => {
        api.logOut().then(() => {
            localStorage.removeItem('refresh')
            localStorage.removeItem('token')
            dispatch({type: CLEAR_USER_STORE})
            history.push('/login')
        })
    }
    return (
        <div className="mr-15">
            <ul className={`${styles.container} mt-0 mb-20`}>
                <li className={`${styles.item}`}>
                    <NavLink to='/profile' className={`${styles.link} text text_type_main-medium text_color_inactive pt-5 pb-5`} activeClassName={`${location.pathname === '/profile' && styles.active}`}>Профиль</NavLink>
                </li>
                <li className={styles.item}>
                    <NavLink to='/profile/orders' className={`${styles.link} text text_type_main-medium text_color_inactive pt-5 pb-5`} activeClassName={styles.active}>История заказов</NavLink>
                </li>
                <li className={styles.item}>
                    <button  className={`${styles.button} text text_type_main-medium text_color_inactive pt-5 pb-5`} onClick={handleExit}>Выход</button>
                </li>
            </ul>
        {location.pathname === '/profile' 
        ?
            <p className={`${styles.text} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
        :
            <></>
        
    }
        </div>
    )
}

export default NavBar;