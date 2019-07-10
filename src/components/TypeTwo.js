import React from "react";
import styles from "./Type.less";
const TypeTwo = props => {
  return (
    <div className={styles.typeTwo}>
      <h3 className={styles.type_title}>{props.title}</h3>
      <p className={styles.type_desc}>{props.desc}</p>
    </div>
  );
};

TypeTwo.propTypes = {};

export default TypeTwo;
