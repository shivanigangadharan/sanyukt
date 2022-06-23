import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from 'react-redux';

// Call make Server
// makeServer();

ReactDOM.render(
  <React.StrictMode>
    {/* <AuthProvider> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </AuthProvider > */}
  </React.StrictMode>,
  document.getElementById("root")
);
