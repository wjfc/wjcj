import React from "react";
import { Router, Route, Switch } from "dva/router";

import IndexPage from "./routes/IndexPage";
import RulerPage from "./routes/RulerPage";
import RecordPage from "./routes/RecordPage";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/index.html" exact component={IndexPage} />
        <Route path="/ruler" exact component={RulerPage} />
        <Route path="/record" exact component={RecordPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
