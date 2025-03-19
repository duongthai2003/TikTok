import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Globalstyles from "./conponents/Globalstyles/Globalstyles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Globalstyles>
    <App />
  </Globalstyles>
  /* </React.StrictMode> */
);

reportWebVitals();
