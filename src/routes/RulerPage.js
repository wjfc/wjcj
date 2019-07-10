import React, { Component } from "react";

import styles from "./RulerPage.less";
import rulerLogo from "../assets/images/ruler/rulerLogo.png";
function RulerPage() {
  return (
    <div className={styles.rulerContainer}>
      <img src={rulerLogo} alt="" className={styles.rulerLogo} />
      <div className={styles.rulerInfo}>
        <section>
          <h3>活动时间</h3>
          <p>2019.07.15-2019.07.28</p>
        </section>
        <section>
          <h3>活动规则</h3>
          <p>
            1.活动通道：a.云媒体电视2号键活动页面b.江苏有线吴江分公司微信公众平台
          </p>
          <p>
            2. 抽奖方式： a.云媒体电视2号键活动页面：每人每天抽奖次数1次
            每天分享到微信朋友圈，抽奖机会增加1次
            b.江苏有线吴江分公司微信公众平台：每人每天抽奖次数1次（必须关注公众号）
            每天分享到微信朋友圈，抽奖机会增加1次 以上共计每天总共4次抽奖机会。
          </p>
          <p>
            3. 奖品设置：
            油烟机清洗（每周1份）、冰箱清洗收纳（每周5份）、洗衣机清洗（每周5份）、大红家政套餐满100减20券（每周30份）、炫力动漫体验券（每周50份）、谢谢参与（兜底奖项）。
          </p>
        </section>
        <section>
          <h3>兑奖流程</h3>
          <p>
            1、中奖用户需在中奖页面填写有效手机号用于接收兑奖码短信，无中奖短信将无法办理兑奖手续；
          </p>
          <p>
            2、兑奖方式：
            a、大红家政服务类奖品（冰箱、油烟机、洗衣机清洗套餐）：中奖用户直接联系大红客服进行服务预约，客服电话
            18962599826或 400-828-8822，服务有效期截止2019年11月1日。
            b.大红家政满减券：中奖用户至商家消费，直接出示中奖码短信，即可享受满减优惠。
            C.江苏有线虚拟类奖品（炫力动漫15天体验券）：用户凭中奖码短信及本人身份证至各广电营业厅进行兑奖。用户进入炫力动漫板块输入体验券券码即可免费体验。
          </p>
        </section>
        <section>
          <p>*本活动最终解释权归江苏有线吴江分公司所有。</p>
        </section>
      </div>
    </div>
  );
}

export default RulerPage;
