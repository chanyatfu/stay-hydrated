import React from 'react';
import { render } from 'ink';
import App from './App.tsx';
import Loki from 'lokijs';
import { RouterProvider } from "./contexts/router-context.tsx";
import { StoreProvider } from "./stores/root-store.tsx";

const db = new Loki('stay-hydrated.db', {
  autoload: true,
  autoloadCallback : databaseInitialize,
  autosave: true,
  autosaveInterval: 4000
});

function databaseInitialize() {
  let entries = db.getCollection("entries");
  if (entries === null) {
    entries = db.addCollection("entries");
  }

  // Perform further operations like insert/find here or in another function
}

render(
  <React.StrictMode>
    <StoreProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </StoreProvider>
  </React.StrictMode>
);
