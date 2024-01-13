import React from 'react';
import { render } from 'ink';
import App from './App.tsx';
import { RouterProvider } from "./contexts/router-context.tsx";
import { StoreProvider } from "./stores/root-store.tsx";;

render(
  <React.StrictMode>
    <StoreProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </StoreProvider>
  </React.StrictMode>
);
