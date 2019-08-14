import React from "react";
import { Router } from "react-router-dom";
import * as H from "history";

import "./App.css";
import { Dashboard } from "./pages/Dashboard";

const history = H.createBrowserHistory();

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Dashboard history={history} />
    </Router>
  );
};

export default App;
