import {
  drawCount,
  getPrize,
  lotteryDraw,
  syncWinningPersion,
  getWinningList,
  pvCollect
} from "../services/index";

export default {
  namespace: "draw",
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    }
  },
  effects: {
    *drawCount({ payload }, { call, put }) {
      // eslint-disable-line
      const response = yield call(drawCount, payload);
      try {
        yield put({
          type: "saveCount",
          payload: { count: response.data.result.drawcount }
        });
      } catch (error) {}
    },
    *pvCollect({ payload }, { call, put }) {
      // eslint-disable-line
      const response = yield call(pvCollect, payload);
    },
    *getPrize({ payload }, { call, put }) {
      // eslint-disable-line
      const response = yield call(getPrize, payload);
      yield put({
        type: "savePrizeList",
        payload: { prizeList: response.data.result.prizeList }
      });
    },
    *lotteryDraw({ payload, callback }, { call, put }) {
      // eslint-disable-line
      const response = yield call(lotteryDraw, payload);
      if (callback) {
        callback(response.data.result);
      }
      yield put({
        type: "saveLotteryResult",
        payload: { lotteryResult: response.data.result }
      });
    },
    //同步个人中奖信息
    *syncWinningPersion({ payload, callback }, { call, put }) {
      // eslint-disable-line
      const response = yield call(syncWinningPersion, payload);
      if (callback) {
        callback(response.data.result);
      }
    },
    *getWinningList({ payload, callback }, { call, put }) {
      // eslint-disable-line
      const response = yield call(getWinningList, payload);
      yield put({
        type: "saveWinningList",
        payload: { winninglist: response.data.result.winninglist }
      });
    }
  },
  reducers: {
    saveCount(state, action) {
      return { ...state, ...action.payload };
    },
    savePrizeList(state, action) {
      return { ...state, ...action.payload };
    },
    saveWinningList(state, action) {
      return { ...state, ...action.payload };
    },
    saveLotteryResult(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
