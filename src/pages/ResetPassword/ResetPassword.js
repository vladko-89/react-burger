import React from 'react';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Form from '../../components/Form/Form';
import ParagraphForm from '../../components/ParagraphForm/ParagraphForm';
import api from '../../utils/api';
import {REQUEST_PASSWORD_RESET} from '../../systems/actions'
import {useFormWithValidation} from '../../hooks/useForm';
import styles from './ResetPassword.module.css'

const ResetPassword = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {values, handleChange, isValid} = useFormWithValidation();

    function submitForm(e) {
        e.preventDefault();
        if (isValid) {
            api.reset(values).then(() => {
                dispatch({type: REQUEST_PASSWORD_RESET});
                history.push('/login')
            })
            .catch((err) => console.log(err));
        }
        
    }

    return (
        <div className={`${styles.container} mt-25`}>
            <Form title="Восстановление пароля" textButton="Сохранить" onSubmit={submitForm}>
                <li className="mb-6">
                    <PasswordInput onChange={handleChange} required value={values.password || ''} name={'password'} placeholder={'Введите новый пароль'}/>
                </li>
                <li className="mb-6">
                    <Input onChange={handleChange} required value={values.code || ''} name={'code'} placeholder={'Введите код из письма'}/>
                </li>
            </Form>
            <ParagraphForm text="Вспомнили пароль?" path="/login" textLink="Войти" />
        </div>
    )
}

export default ResetPassword;