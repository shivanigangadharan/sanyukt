import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/authContext";
import { StateProvider } from "./context/stateContext";

// Call make Server
// makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <StateProvider>
        <App />
      </StateProvider>
    </AuthProvider >
  </React.StrictMode>,
  document.getElementById("root")
);
