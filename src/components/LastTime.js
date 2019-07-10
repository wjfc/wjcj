import React from "react";
import styles from "./LastTime.less";
const LastTime = props => {
  return (
    <div className={styles.LastTime}>
      <div className={styles.info}>
        <span>你有</span>
        <span className={styles.count}>{props.count}</span>
        <span>次抽奖机会</span>
      </div>
    </div>
  );
};

LastTime.propTypes = {};

export default LastTime;
