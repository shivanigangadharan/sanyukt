import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/authContext";
import { StateProvider } from "./context/stateContext";
import { store } from "./redux/store";
import { Provider } from 'react-redux';

// Call make Server
// makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      {/* <StateProvider> */}
      <Provider store={store}>
        <App />
      </Provider>
      {/* </StateProvider> */}
    </AuthProvider >
  </React.StrictMode>,
  document.getElementById("root")
);
