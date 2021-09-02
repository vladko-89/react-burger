import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styles from './ParagraphForm.module.css'

const ParagraphForm = ({text, path, textLink}) => {
    return <p className="text text_type_main-default text_color_inactive">{text} <Link className={styles.link} to={path}>{textLink}</Link></p>
}

ParagraphForm.propTypes = {
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    textLink: PropTypes.string.isRequired
}

export default ParagraphForm;