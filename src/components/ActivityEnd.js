// 活动已结束
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
const ActivityEnd = withFailureMessage(FailureMessage, {
  tips1: "活动已结束！",
  tips2: "活动时间：2019.07.15-2019.07.28"
});
export default ActivityEnd;
