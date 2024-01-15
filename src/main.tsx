import React from "react";
import { render } from "ink";
import App from "./App";
import { RouterProvider } from "./contexts/router-context";
import { StoreProvider } from "./stores/root-store";
import { DatabaseProvider } from "./database/index";

render(
  <React.StrictMode>
    <DatabaseProvider>
      <StoreProvider>
        <RouterProvider>
          <App />
        </RouterProvider>
      </StoreProvider>
    </DatabaseProvider>
  </React.StrictMode>,
);
