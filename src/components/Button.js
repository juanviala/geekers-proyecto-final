import React from 'react';

const Button = ({ handleClick, texto, classes, idProp, styles }) => {
   return (
    <button id={idProp} style={styles} className={classes} onClick={handleClick}>{texto}</button>
  );
}

export default Button;