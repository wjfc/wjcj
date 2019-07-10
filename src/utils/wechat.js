import { shareCollect, dojssdk, updDrawCount } from "../services/index";
import { terminaltype, customertype, eventid } from "../constant/index";
let userid = localStorage.getItem("userid");

var getConfig = function(url, appCode, dispatch) {
  dojssdk("url=" + url + "&appCode=" + appCode).then(res => {
    window.dispatch = dispatch;
    const { data } = res;
    wxConfig(data.appid, data.timestamp, data.nonceStr, data.signature);
  });
};

var wxConfig = function(_appid, _timestamp, _nonceStr, _signature) {
  window.wx.config({
    // debug: true,
    appId: _appid,
    timestamp: _timestamp,
    nonceStr: _nonceStr,
    signature: _signature,
    jsApiList: [
      "onMenuShareTimeline", // 分享到朋友圈接口
      "onMenuShareAppMessage", //  分享到朋友接口
      "onMenuShareQQ", // 分享到QQ接口
      "onMenuShareWeibo" // 分享到微博接口
    ]
  });
  window.wx.ready(function() {
    // 微信分享的数据
    var shareData = {
      imgUrl: "http://wjwjj.wjcatv.com.cn/redLottery/images/banner.png", // 分享显示的缩略图地址
      link: "http://wjwjj.wjcatv.com.cn/redLottery/#/", // 分享地址
      desc: "分享获取一次抽奖机会！", // 分享描述
      title: "看电视赢福利，当红人焕新家", // 分享标题
      success: function() {
        var data = {
          terminaltype: "Mobile",
          customerno: userid,
          eventid: eventid,
          customertype: customertype,
          type: "add",
          times: 1,
          multiShare: "refuse"
        };
        updDrawCount(data).then(res => {
          const { data } = res;
          if (data.result.errorcode === "-3") {
            window.dispatch({
              type: "message/saveSMessage",
              payload: { show_resultMessage: true }
            });
          } else {
            // 分享成功重新调用
            window.dispatch({
              type: "draw/drawCount",
              payload: {
                customerno: userid,
                terminaltype,
                customertype,
                eventid
              }
            });
          }
        });
        var shareobj = {
          eventId: eventid,
          url: window.location.href.split("#")[0],
          terminalType: 3,
          userType: 4,
          userValue: userid,
          shareTarget: 0
        };
        shareCollect(shareobj).then(res => {});
      }
    };
    window.wx.onMenuShareTimeline(shareData);
    window.wx.onMenuShareAppMessage(shareData);
    window.wx.onMenuShareQQ(shareData);
    window.wx.onMenuShareWeibo(shareData);
  });
};
window.wx.error(function(res) {
  // config信息验证失败会执行error函数，如签名过期导致验证失败，
  // 具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，
  //对于SPA可以在这里更新签名。
  alert(res.errMsg);
});
export default {
  getConfig,
  wxConfig
};
