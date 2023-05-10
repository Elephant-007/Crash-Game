import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./App.css";
import Main from "./app/pages/Main";
import SocketProvider from "./app/socket/socket";

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <SocketProvider />
        <Main />
      </Provider>
    </React.StrictMode>
  );
};

export default App;
