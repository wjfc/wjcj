import React, { Component } from "react";
import { connect } from "dva";
import { terminaltype, customertype, eventid } from "../constant/index";
import styles from "./RecordPage.less";

function RecordItem(props) {
  const { effectivetime, prizename } = props.dataSource;
  return (
    <div className={styles.recordItem}>
      <p className={styles.precent40}>{effectivetime}</p>
      <p className={styles.precent60}>{prizename}</p>
    </div>
  );
}

class RecordPage extends Component {
  componentDidMount() {
    const userid = localStorage.getItem("userid");
    const { dispatch } = this.props;
    // 获取奖品列表
    dispatch({
      type: "draw/getWinningList",
      payload: {
        customerno: userid,
        terminaltype,
        customertype,
        eventid
      }
    });
  }
  render() {
    const { draw } = this.props;
    const { winninglist } = draw;
    return (
      <div className={styles.recordContainer}>
        <div className={styles.recordBox}>
          <div className={styles.recordMenu}>
            <h3 className={styles.precent40}>中奖时间</h3>
            <h3 className={styles.precent60}>奖品</h3>
          </div>
          <div className={styles.recordList}>
            {winninglist &&
              winninglist.map((v, i) => {
                return <RecordItem dataSource={v} key={v.winninglistid} />;
              })}
          </div>
        </div>
      </div>
    );
  }
}
export default connect(({ draw }) => {
  return { draw };
})(RecordPage);
