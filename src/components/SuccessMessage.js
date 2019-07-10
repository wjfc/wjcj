// 获得奖品弹窗
// 中奖需要区分是家政还是动漫,展示不同的样式。
import React, { Component } from "react";
import { connect } from "dva";
import { terminaltype, customertype, eventid, list } from "../constant/index";
import checkPhone from "../utils/checkPhone";
import styles from "./SuccessMessage.less";
import message_logo from "../assets/images/message_logo.png";
function Notification(props) {
  const { info } = props;
  return (
    <div className={styles.notify}>
      <i className="icon-notification" />
      <span className={styles.info}>{info}</span>
    </div>
  );
}

class SuccessMessage extends Component {
  state = {
    hasLogoAndTips: true, //是否有logo和提示
    inputValue: "",
    commitDrop: false,
    showNotify: false,
    notifyInfo: "",
    prizeid: ""
  };
  componentDidMount() {
    const { message } = this.props;
    const { prizeid } = message;
    if (prizeid === 6) {
      this.setState({
        prizeid: prizeid,
        hasLogoAndTips: false
      });
    } else {
      this.setState({
        prizeid: prizeid
      });
    }
  }
  handleInput = e => {
    this.setState({
      inputValue: e.target.value
    });
  };
  handleSubmitBtn = () => {
    // 需先校验手机号是否填入和是否正确
    if (this.state.inputValue) {
      const flag = checkPhone(Number(this.state.inputValue));
      if (!flag) {
        this.setState({
          showNotify: true,
          notifyInfo: "领奖手机号码格式不正确，请先校验！",
          commitDrop: false
        });
      } else {
        // 先重置，后调用同步个人中奖信息接口,最后关闭窗口。
        this.setState({
          showNotify: false,
          notifyInfo: "",
          commitDrop: false
        });
        this.syncWinningPersion();
      }
    } else {
      this.setState({
        showNotify: true,
        notifyInfo: "请先输入领奖手机号码！"
      });
    }
  };
  // 同步个人中奖信息
  syncWinningPersion = () => {
    const userid = localStorage.getItem("userid");
    const { dispatch, draw } = this.props;
    const { lotteryResult } = draw;
    dispatch({
      type: "draw/syncWinningPersion",
      payload: {
        customerno: userid,
        customertype,
        eventid,
        winninglistid: lotteryResult.winninglistid,
        name: "",
        address: "",
        mobile: this.state.inputValue
      },
      callback: res => {
        this.handleCloseIcon();
      }
    });
  };
  handleCloseIcon = () => {
    const { dispatch } = this.props;
    const { commitDrop, inputValue } = this.state;
    if (inputValue || commitDrop) {
      // 弹窗逻辑
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
    } else {
      this.setState({
        showNotify: true,
        notifyInfo: "不输入手机号码视为放弃奖品！",
        commitDrop: true
      });
    }
  };
  render() {
    let prizeResult = { imgUrl1: "", desc: "", prizename: "" };
    const { hasLogoAndTips, inputValue, notifyInfo, showNotify } = this.state;
    const { message } = this.props;
    const { prizeid } = message;

    const prizeFlag = prizeid === "" ? false : true;
    if (prizeFlag) {
      prizeResult = list[prizeid];
    }
    const { imgUrl1, desc, prizename, num } = prizeResult;
    return (
      <div className={styles.messageModel}>
        {prizeFlag && (
          <div className={`${styles.messageBox} animated zoomIn `}>
            <i
              className={`${styles.closeIcon} icon-close`}
              onClick={this.handleCloseIcon}
            />
            <div className={styles.messaageTop}>
              {hasLogoAndTips && (
                <img
                  src={message_logo}
                  alt=""
                  className={styles.message_logo}
                />
              )}
              <p className={styles.congratulations}>恭喜您抽中了</p>
              <p className={styles.prizename}>{prizename}</p>
              <div className={`${styles.bigeImg} bigImg${num}`} />
              {hasLogoAndTips && (
                <p className={styles.prizeTips}>（本奖品由大红家政温暖提供）</p>
              )}
            </div>
            <div className={styles.messageBottom}>
              <input
                type="text"
                className={styles.mobileInput}
                placeholder="请输入您的手机号码"
                value={inputValue}
                onChange={this.handleInput}
              />
              {showNotify && <Notification info={notifyInfo} />}
              <p className={styles.prizeInfo}>{desc}</p>
              <button
                className={styles.submitBtn}
                onClick={this.handleSubmitBtn}
              >
                立即领奖
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default connect(({ message, draw }) => {
  return { message, draw };
})(SuccessMessage);
