import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {useFormWithValidation} from '../../hooks/useForm';
import { updateUserInfo } from '../../systems/actions'
import styles from './FormEditProfile.module.css';


const FormEditProfile = () => {
    const {user} = useSelector(store => ({
        user: store.user.userData
    }))
const dispatch = useDispatch();
    const {values, handleChange, isValid, setValues} = useFormWithValidation();

    function submitForm(e) {
        e.preventDefault();
        dispatch(updateUserInfo(values))
    }

    function resetForm() {
        setValues({
            name: user.name,
            email: user.email,
            password: '***'
        })
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
                { isValid
                &&
                
                    <div className={`${styles.buttons}`}>
                        <button className={`${styles.reset} text text_type_main-small pr-3 pl-7`} type='button' onClick={resetForm}>Отменить</button>
                        <Button className={styles.button} type="primary" size="large">Сохранить</Button>
                    </div>
                }
            </form>
        </>
    )
}
export default FormEditProfile;