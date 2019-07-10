import React, { Component } from "react";
import { connect } from "dva";
import styles from "./Lottery.less";
import classNames from "classnames";
import { terminaltype, customertype, eventid, list } from "../constant/index";
import drawBtn from "../assets/images/drawBtn.png";
const RowItem = ({ content, activedId }) => {
  return (
    <div
      className={`${styles.lottery_item} ${
        content.num === activedId
          ? "lottery_item_active"
          : "lottery_item_normal"
      }`}
    >
      <div className={classNames("prizeImg", "prizeImg" + content.num)} />
      <p className={styles.prizeTitle}>{content.prizename}</p>
    </div>
  );
};
class Lottery extends Component {
  state = {
    isRolling: false, //是否正在抽奖
    actTimes: 0, // 当前动画次数
    activedId: null, // 被选中的元素的id
    prizeId: null, //对应奖品编号id
    times: 0, //动画执行次数
    list: list
  };
  handleReady = e => {
    if (!this.state.isRolling) {
      const { dispatch } = this.props;
      this.setState(
        {
          activedId: null,
          actTimes: 0,
          times: 0,
          isRolling: true,
          prizeId: null
        },
        () => {
          const userid = localStorage.getItem("userid");
          dispatch({
            type: "draw/lotteryDraw",
            payload: {
              customerno: userid,
              terminaltype,
              customertype,
              eventid
            },
            callback: res => {
              // 网络错误禁止抽奖
              if (res.err) {
                this.setState({
                  isRolling: false
                });
                return false;
              }
              const count = Number(this.props.draw.count);

              if (count == 0) {
                // 无抽奖次数禁止抽奖
                dispatch({
                  type: "message/saveSMessage",
                  payload: { show_nocountMessage: true }
                });
                this.setState({
                  isRolling: false
                });
                return false;
              } else {
                switch (1) {
                  case -7:
                    dispatch({
                      type: "message/saveSMessage",
                      payload: { show_activityNotStart: true }
                    });
                    this.setState({
                      isRolling: false
                    });
                    break;
                  case -8:
                    dispatch({
                      type: "message/saveSMessage",
                      payload: { show_activityEnd: true }
                    });
                    this.setState({
                      isRolling: false
                    });
                    break;
                  default:
                    //抽奖之后刷新次数。
                    this.handlePlay(res);
                    // 获取剩余抽奖次数
                    dispatch({
                      type: "draw/drawCount",
                      payload: {
                        customerno: userid,
                        terminaltype,
                        customertype,
                        eventid
                      }
                    });
                    break;
                }
              }
            }
          });
        }
      );
    } else {
      return false;
    }
  };
  handlePlay = result => {
    var prize = this.getPrizeNum(result);
    this.setState({
      prizeId: prize,
      activedId: 0
    });
    var actTimes = 0;
    // 随机算出一个动画执行的最小次数。
    let times = this.state.list.length * Math.floor(Math.random() * 2 + 4);
    // 抽奖开始
    this.begin = setInterval(() => {
      let num;
      if (this.state.activedId === this.state.prizeId && actTimes >= times) {
        // 结束动画
        clearInterval(this.begin);
        setTimeout(() => {
          this.setState({
            isRolling: false
          });
          this.handleMessage(result);
        }, 500);
        return false;
      }
      // 以下是动画执行时对id的判断
      if (this.state.activedId === "") {
        num = 0;
        this.setState({
          activedId: num
        });
      } else {
        num = this.state.activedId;
        if (num === 7) {
          num = 0;
          this.setState({
            activedId: num
          });
        } else {
          num = num + 1;
          this.setState({
            activedId: num
          });
        }
      }
      actTimes++;
    }, 90);
    // 获取中奖的id编号
  };
  getPrizeNum = res => {
    const list = this.state.list;
    const { prizeid, iswinning } = res;
    let prizeNum = null;
    if (prizeid) {
      // 抽奖成功
      list.forEach((v, i) => {
        if (prizeid === v.prizeid) {
          prizeNum = v.num;
          return;
        }
      });
      return prizeNum;
    } else {
      const randomList = [3, 5, 7];
      const randomIndex = Math.floor(Math.random() * 3);
      return randomList[randomIndex];
    }
  };
  handleMessage = res => {
    const { dispatch } = this.props;
    // 弹窗逻辑 => 需要判断是哪种类型的弹窗
    console.log(this.state.prizeId);
    switch (this.state.prizeId) {
      case 0:
      case 1:
      case 2:
      case 4:
      case 6:
        console.log("成功获得奖品");
        dispatch({
          type: "message/saveSMessage",
          payload: {
            show_successMessage: true,
            prizeid: this.state.prizeId
          }
        });
        break;

      default:
        console.log("未获得奖品");
        dispatch({
          type: "message/saveSMessage",
          payload: {
            show_failureMessage: true,
            prizeid: this.state.prizeId
          }
        });
        break;
    }
    //看需求是否要将奖品状态置空。
    // this.setState({
    //   activedId: null
    // });
  };
  render() {
    const { list, activedId } = this.state;
    const { draw } = this.props;
    const { count } = draw;

    let flag_scale = false;
    if (this.state.isRolling === false && count > 0) {
      flag_scale = true;
    }
    return (
      <div className={styles.Lottery}>
        <div className={styles.LotteryBox}>
          <img
            src={drawBtn}
            className={`${styles.drawBtn} ${
              flag_scale ? styles.flag_scale : ""
            }`}
            onTouchStart={this.handleReady}
          />
          <div className={styles.area}>
            <RowItem content={list[0]} activedId={activedId} />
            <RowItem content={list[1]} activedId={activedId} />
            <RowItem content={list[2]} activedId={activedId} />
          </div>
          <div className={styles.area}>
            <RowItem content={list[7]} activedId={activedId} />
            <RowItem content={list[3]} activedId={activedId} />
          </div>
          <div className={styles.area}>
            <RowItem content={list[6]} activedId={activedId} />
            <RowItem content={list[5]} activedId={activedId} />
            <RowItem content={list[4]} activedId={activedId} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ draw }) => {
  return { draw };
})(Lottery);
