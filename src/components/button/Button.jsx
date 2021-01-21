import React from "react";
import styles from "../button/button.modul.css";

const Button = ({ fetchImages }) => {
  return (
    <button type="button" onClick={fetchImages} className={styles.Button}>
      Load more
    </button>
  );
};

export default Button;
