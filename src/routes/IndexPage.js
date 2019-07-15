import React, { Component } from "react";
import { connect } from "dva";
import { NavLink } from "dva/router";

import { terminaltype, customertype, eventid } from "../constant/index";
import SuccessMessage from "../components/SuccessMessage";
import FailureMessage from "../components/FailureMessage";
import NeterrorMessage from "../components/NeterrorMessage";
import NocountMessage from "../components/NocountMessage";
import ActivityEnd from "../components/ActivityEnd";
import ActivityNotStart from "../components/ActivityNotStart";
import Result from "../components/Result";
import TypeOne from "../components/TypeOne";
import TypeTwo from "../components/TypeTwo";
import LastTime from "../components/LastTime";
import Lottery from "../components/Lottery";
import styles from "./IndexPage.less";
import wechat from "../utils/wechat";

import logo from "../assets/images/logo.png";
import banner from "../assets/images/banner.png";
const NavLinkItem = () => {
  return (
    <div className={styles.link}>
      <NavLink to="/record">中奖记录</NavLink>
      <NavLink to="/ruler">活动规则</NavLink>
    </div>
  );
};

class IndexPage extends Component {
  componentDidMount() {
    const userid = localStorage.getItem("userid");
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
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
      // 获取奖品列表
      dispatch({
        type: "draw/getPrize",
        payload: {
          terminaltype,
          eventid
        }
      });
      // 提交页面访问
      dispatch({
        type: "draw/pvCollect",
        payload: {
          terminaltype: 3,
          eventid,
          userType: customertype,
          url: window.location.href,
          userValue: userid
        }
      });
      wechat.getConfig(
        encodeURIComponent(window.location.href.split("#")[0]),
        "wj_wjcj",
        dispatch
      );
    });
  }

  render() {
    const { draw, message } = this.props;
    const { count, prizeList, lotteryResult } = draw;
    const {
      show_successMessage,
      show_failureMessage,
      show_nocountMessage,
      show_netErrorMessage,
      show_resultMessage,
      show_activityNotStart,
      show_activityEnd
    } = message;
    return (
      <div className={styles.container}>
        <img src={logo} alt="" className={styles.logo} />
        <img src={banner} alt="" className={styles.banner} />
        <TypeOne title="福利一" desc="充值即享4K P60超高清机顶盒" />
        <TypeOne
          title="福利二"
          desc="微宽带仅需2元/月，订购即送文广点播"
          style={{ marginTop: "-0.5rem" }}
        />
        <TypeTwo
          title="福利三"
          desc="宽带价格直降冰点，最低仅需10元/月，续费用户还可享“订12个月赠2个月”优惠"
        />
        <TypeTwo
          title="福利四"
          desc="大奖抽不停，连续两周，大红家政免费帮您焕新家"
        />
        <LastTime count={count} />
        {true && <Lottery dataSource={prizeList} />}
        <NavLinkItem />
        {show_successMessage && <SuccessMessage dataSource={lotteryResult} />}
        {show_failureMessage && (
          <FailureMessage
            tips1="好遗憾 就差一点点"
            tips2="转发至微信朋友圈每天可增加一次机会"
          />
        )}
        {show_netErrorMessage && <NeterrorMessage />}
        {show_nocountMessage && <NocountMessage />}
        {show_resultMessage && <Result />}
        {show_activityNotStart && <ActivityNotStart />}
        {show_activityEnd && <ActivityEnd />}
      </div>
    );
  }
}
export default connect(({ draw, message }) => {
  return { draw, message };
})(IndexPage);
