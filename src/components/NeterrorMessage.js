// 异常情况弹窗
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
const NeterrorMessage = withFailureMessage(FailureMessage, {
  tips1: "网络异常",
  tips2: "请稍后再试!"
});
export default NeterrorMessage;
