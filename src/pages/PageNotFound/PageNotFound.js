import React from 'react'
import {useHistory} from 'react-router-dom'
import { Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './PageNotFound.module.css'

const PageNotFound = () => {
    const history = useHistory();

    function handleClick() {
        history.goBack();
    }
    return (
        <div className={`${styles.container} mt-25`}>
            <div className={styles.content}>
                <p className="text text_type_digits-large mb-10">404</p>
                <p className="text text_type_main-medium mb-5">Страница еще в разработке</p>
                <Button type="primary" size="large" onClick={handleClick}>Вернуться обратно</Button>
            </div>
        </div>

    )
}

export default PageNotFound;