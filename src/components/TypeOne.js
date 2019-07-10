import React from "react";
import styles from "./Type.less";
const TypeOne = props => {
  return (
    <div className={styles.typeOne}>
      <h3 className={styles.type_title}>{props.title}</h3>
      <p className={styles.type_desc}>{props.desc}</p>
    </div>
  );
};

TypeOne.propTypes = {};

export default TypeOne;
