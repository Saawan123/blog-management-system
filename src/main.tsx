import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./Store/store";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css';


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
