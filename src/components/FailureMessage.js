// 未中奖弹窗

import React, { Component } from "react";
import { connect } from "dva";

import styles from "./FailureMessage.less";

class SuccessMessage extends Component {
  componentDidMount() {}

  handleCloseIcon = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    // 关闭弹窗逻辑
    dispatch({
      type: "message/saveSMessage",
      payload: {
        show_successMessage: false,
        show_failureMessage: false,
        show_errorMessage: false,
        show_nocountMessage: false,
        show_netErrorMessage: false,
        show_resultMessage: false,
        show_activityNotStart: false,
        show_activityEnd: false,
        isRolling: false,
        prizeid: ""
      }
    });
  };

  render() {
    const { tips1, tips2 } = this.props;
    return (
      <div className={styles.messageModel}>
        <div className={`${styles.messageBox}`}>
          <p className={styles.tips1}>{tips1}</p>
          <p className={styles.tips2}>{tips2}</p>
          <button className={styles.submitBtn} onClick={this.handleCloseIcon}>
            我知道了
          </button>
        </div>
      </div>
    );
  }
}
export default connect()(SuccessMessage);
