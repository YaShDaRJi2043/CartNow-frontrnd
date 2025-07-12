import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "bootstrap/dist/css/bootstrap.min.css";

import { store, persistor } from "./store";
import PagesRoutes from "./routes";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <PagesRoutes />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
