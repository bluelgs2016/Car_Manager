import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import store from "./hooks/store/store";
import { Provider } from "react-redux";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store.store}>
      <PersistGate persistor={store.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
