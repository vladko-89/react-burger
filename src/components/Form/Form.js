import React from 'react';
import PropTypes from 'prop-types';
import { Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Form.module.css'


const Form = ({title, children, textButton, onSubmit}) => {

    return (
        <div className={styles.container}>
            <h2 className="text text_type_main-medium mb-6">{title}</h2>
            <form className={`${styles.form} mb-20`} onSubmit={onSubmit}>
                <ul className={`${styles.inputs}`}>
                    {children}
                </ul>
                <Button type="primary" size="large">{textButton}</Button>
            </form>
        </div>
    )
}

Form.propTypes = {
    title: PropTypes.string.isRequired,
    textButton: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

export default Form;