import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/Form/Form';
import ParagraphForm from '../../components/ParagraphForm/ParagraphForm';
import {login} from '../../systems/actions'
import styles from './Login.module.css'

import {useFormWithValidation} from '../../hooks/useForm';

const Login = () => {
    const { user, error } = useSelector(store => ({
        user: store.user.userData,
        error: store.user.error_401
    }))
    const location = useLocation();

    const {values, handleChange, errors} = useFormWithValidation();
    const dispatch = useDispatch();
    function submitRegisterForm(e) {
        e.preventDefault();
        dispatch(login(values));
    }

    if (user !== null && user !== {}) {
        return (
            <Redirect to={location.state?.from.pathname || '/'} />
        )
    }
    return (
        <div className={styles.container}>
            <Form title="Вход" textButton="Войти" onSubmit={submitRegisterForm}>
                <li className={`${styles.input} mb-6`}>
                    <Input onChange={handleChange} placeholder="E-mail" type="email" required value={values.email || ''} name={'email'} />
                    <span className={`${styles.error} text text_type_main-small`}>{errors.email}</span>
                </li>
                <li className={`${styles.input} mb-6`}>
                    <PasswordInput onChange={handleChange} required value={values.password || ''} name={'password'} />
                    <span className={`${styles.error} text text_type_main-small`}>{errors.password}</span>
                </li>
            </Form>
            {error && <p className="text text_type_main-medium">Неверный логин или пароль</p>}
            <ParagraphForm text="Вы — новый пользователь?" path="/register" textLink="Зарегистрироваться" />
            <ParagraphForm text="Забыли пароль?" path="/forgot-password" textLink="Восстановить пароль" />
        </div>
    )
}

export default Login;