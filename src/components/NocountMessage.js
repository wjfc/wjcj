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
const NocountMessage = withFailureMessage(FailureMessage, {
  tips1: "已无抽奖次数了",
  tips2: "转发至微信朋友圈可增加一次抽奖机会!"
});
export default NocountMessage;
