import React from 'react';
import { useDispatch } from 'react-redux';
import { Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/Form/Form';
import ParagraphForm from '../../components/ParagraphForm/ParagraphForm';
import {login} from '../../systems/actions'
import styles from './Login.module.css'

import {useFormWithValidation} from '../../hooks/useForm';

const Login = () => {
    const {values, handleChange, errors, isValid} = useFormWithValidation();
    const dispatch = useDispatch();
    function submitRegisterForm(e) {
        e.preventDefault();
        dispatch(login(values));
        
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
            <ParagraphForm text="Вы — новый пользователь?" path="/register" textLink="Зарегистрироваться" />
            <ParagraphForm text="Забыли пароль?" path="/forgot-password" textLink="Восстановить пароль" />
        </div>
    )
}

export default Login;