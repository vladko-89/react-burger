import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import styles from './HeaderButton.module.css';

function HeaderButton({component: Component, text, active, onSetCurrent, path}) {
  return (
    <Link to={path} className={`${styles.button} pt-4 pb-4 pr-5 pl-5`} value={text} onClick={() => onSetCurrent(text)}>
      <Component type={`${active === text ? "primary" : "secondary"}`} />
      <p className={`text text_type_main-default ml-2 ${active === text ? "" : "text_color_inactive"}`}>
        {text}
      </p>
    </Link>
  )
}

HeaderButton.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
  onSetCurrent: PropTypes.func.isRequired
}

export default HeaderButton;