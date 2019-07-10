import request from "../utils/request";
import { stringify } from "qs";
//获取抽奖地址
export function drawCount(params) {
  return request(`/interface/drawCount?${stringify(params)}`);
}
// 获取奖品
export function getPrize(params) {
  return request(`/interface/getPrize?${stringify(params)}`);
}
// 抽奖
export function lotteryDraw(params) {
  return request(`/interface/lotteryDraw?${stringify(params)}`);
}
// 增加次数
export function updDrawCount(params) {
  return request(`/interface/updDrawCount?${stringify(params)}`, {
    method: "POST"
  });
}
// 同步个人中奖信息
export function syncWinningPersion(params) {
  return request(`/interface/syncWinningPersion?${stringify(params)}`, {
    method: "POST"
  });
}
// 获取中奖记录
export function getWinningList(params) {
  return request(`/interface/getWinningList?${stringify(params)}`, {
    method: "POST"
  });
}
// 提交页面访问信息
export function pvCollect(params) {
  return request(`/interface/pvCollect?${stringify(params)}`);
}
// 用户分享活动后，提交分享信息
export function shareCollect(params) {
  return request(`/interface/shareCollect?${stringify(params)}`);
}
// 获取微信公众号相关
export function dojssdk(params) {
  return request(`/weixin/api/dojssdk?${params}`);
}
