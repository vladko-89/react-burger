import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom'
import { PasswordInput, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/Form/Form';
import ParagraphForm from '../../components/ParagraphForm/ParagraphForm';
import {registration} from '../../systems/actions'
import styles from './Register.module.css'

import {useFormWithValidation} from '../../hooks/useForm';

const Register = () => {
    const {user} = useSelector(store =>({
        user: store.user.userData
    }));
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            history.push('/')
        }
    }, [history, user])

    
    const {values, handleChange} = useFormWithValidation();
    function submitRegisterForm(e) {
        e.preventDefault();
        dispatch(registration(values));
        
    }
    return (
        <div className={styles.container}>
            <Form title="Регистрация" textButton="Зарегистрироваться" onSubmit={submitRegisterForm}>
                <li className="mb-6">
                    <Input onChange={handleChange}  value={values.name} name={'name'} placeholder={'Имя'}/>
                </li>
                <li className="mb-6">
                    <Input onChange={handleChange} placeholder="E-mail" type="email"  value={values.email} name={'email'} />
                </li>
                <li className="mb-6">
                    <PasswordInput onChange={handleChange}  value={values.password} name={'password'} />
                </li>
            </Form>
            <ParagraphForm text="Уже зарегистрированы?" path="/login" textLink="Войти" />
        </div>
    )
}

export default Register;