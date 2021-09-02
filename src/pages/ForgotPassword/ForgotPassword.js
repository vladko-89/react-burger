import React from 'react';
import {Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Form from '../../components/Form/Form';
import ParagraphForm from '../../components/ParagraphForm/ParagraphForm';
import {REQUEST_PASSWORD_RESET} from '../../systems/actions'
import api from '../../utils/api';
import {useFormWithValidation} from '../../hooks/useForm';
import styles from './ForgotPassword.module.css'

const ForgotPassword = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {values, handleChange, isValid} = useFormWithValidation();

    function submitForm(e) {
        e.preventDefault();
        if (isValid) {
            api.forgot(values.email).then(() => {
                console.log('На вашу почту отправлен код подтверждения');
                dispatch({type: REQUEST_PASSWORD_RESET});
                history.push('/reset-password')
            })
            .catch((err) => console.log(err));
        }
        
    }

    return (
        <div className={`${styles.container} mt-25`}>
            <Form title="Восстановление пароля" textButton="Восстановить" onSubmit={submitForm}>
                <li className="mb-6">
                    <Input onChange={handleChange} required value={values.email || ''} name={'email'} placeholder={'Укажите e-mail'}/>
                </li>
            </Form>
            <ParagraphForm text="Вспомнили пароль?" path="/login" textLink="Войти" />
        </div>
    )
}

export default ForgotPassword;