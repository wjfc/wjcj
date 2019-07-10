export default {
  namespace: "message",
  state: {
    show_successMessage: false,
    show_failureMessage: false,
    show_errorMessage: false,
    show_nocountMessage: false,
    show_netErrorMessage: false,
    show_resultMessage: false,
    show_activityNotStart: false,
    show_activityEnd: false,
    isRolling: false,
    prizeid: ""
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    }
  },
  effects: {},
  reducers: {
    saveSMessage(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
