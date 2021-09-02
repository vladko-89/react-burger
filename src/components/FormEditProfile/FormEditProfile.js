import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {useFormWithValidation} from '../../hooks/useForm';
import api from '../../utils/api';
import {SET_USERS_DATA_SUCCESS} from '../../systems/actions'
import styles from './FormEditProfile.module.css';


const FormEditProfile = () => {
    const {user} = useSelector(store => ({
        user: store.user.userData
    }))
const dispatch = useDispatch();
    const {values, handleChange, isValid, setValues} = useFormWithValidation();

    function submitForm(e) {
        e.preventDefault();
        api.editUserInfo(values)
            .then((res) => {
                dispatch({type: SET_USERS_DATA_SUCCESS, data: res.user});
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        if (user) {
            setValues({
                name: user.name,
                email: user.email,
                password: '***'
            })
        }
    }, [user, setValues])
    return (
        <>
            <form className={`${styles.form} mb-20 mt-0`} onSubmit={submitForm}>
                <ul className={`${styles.inputs} mt-0`}>
                    <li className={`${styles.input} mb-6`}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            name={'name'}
                            required
                            onChange={handleChange}
                            value={values.name || ''}
                            icon={'EditIcon'}
                        />
                    </li>
                    <li className={`${styles.input} mb-6`}>
                        <Input
                            type={'email'}
                            required
                            placeholder={'Логин'}
                            name={'email'}
                            onChange={handleChange}
                            value={values.email || ''}
                            icon={'EditIcon'}
                        />
                    </li>
                    <li className={`${styles.input}`}>
                        <Input
                            type={'password'}
                            required
                            minLength="6"
                            placeholder={'Пароль'}
                            name={'password'}
                            onChange={handleChange}
                            value={values.password || ''}
                            icon={'EditIcon'}
                        />
                    </li>
                </ul>
                { isValid && <Button className={styles.button} type="primary" size="large">Сохранить</Button>}
            </form>
        </>
    )
}
export default FormEditProfile;