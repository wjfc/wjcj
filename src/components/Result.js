// 无抽奖次数弹窗
import React, { Component } from "react";
import FailureMessage from "./FailureMessage";
function withFailureMessage(component, data) {
  class NewComponent extends Component {
    render() {
      const { tips1, tips2 } = data;
      return <FailureMessage tips1={tips1} tips2={tips2} />;
    }
  }
  return NewComponent;
}
const Result = withFailureMessage(FailureMessage, {
  tips1: "明天再来试试吧~",
  tips2: "每个微信号每天只可增加1次机会!"
});
export default Result;
