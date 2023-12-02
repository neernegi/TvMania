import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./hooks/useContextApi.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  </ChakraProvider>
);
