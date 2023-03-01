import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./utils/scrollToTop";

import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";

import { Provider } from "react-redux";
import store from "./redux/store";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <ScrollToTop />
        <App />
      </QueryParamProvider>
    </Router>
  </Provider>
);
