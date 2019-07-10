import dva from "dva";

import "./index.css";

// 1. Initialize

// const createHistory = require("history").createBrowserHistory;

const app = dva({
  onError(error) {
    console.log(error);
  }
  // history: createHistory({ basename: "/redLottery" })
  // history: createHistory({ basename: "/redLottery" })
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require("./models/draw").default);
app.model(require("./models/message").default);

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");
