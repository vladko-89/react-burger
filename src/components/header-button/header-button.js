import React from 'react';
import PropTypes from 'prop-types';
import styles from './header-button.module.css';

function HeaderButton({component: Component, text, active, onSetCurrent}) {
  return (
    <a className={`${styles.button} pt-4 pb-4 pr-5 pl-5`} value={text} onClick={() => onSetCurrent(text)}>
      <Component type={`${active === text ? "primary" : "secondary"}`} />
      <p className={`text text_type_main-default ml-2 ${active === text ? "" : "text_color_inactive"}`}>
        {text}
      </p>
    </a>
  )
}

HeaderButton.propTypes = {
  component: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
  onSetCurrent: PropTypes.func.isRequired
}

export default HeaderButton;