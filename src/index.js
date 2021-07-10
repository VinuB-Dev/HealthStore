import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { CartProvider } from "./context/data/dataContext";
import { UserProvider } from "./context/user/userContext";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <CartProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </CartProvider>
    </Router>
  </StrictMode>,
  rootElement
);
