import React from 'react';
import { render } from 'ink';
import App from './App.tsx';
import { RouterProvider } from "./contexts/router-context.tsx";
import { StoreProvider } from "./stores/root-store.tsx";import { DatabaseProvider } from "./database/index.tsx";
;

render(
  <React.StrictMode>
    <DatabaseProvider>
      <StoreProvider>
        <RouterProvider>
          <App />
        </RouterProvider>
      </StoreProvider>
    </DatabaseProvider>
  </React.StrictMode>
);
