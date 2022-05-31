import React from "react";
import { render } from "react-dom";
import App from "./App";
import { store } from './stores/store'
import { Provider } from 'react-redux'

render(
  <Provider store={store}>
      <App />
  </Provider>, 
  document.body
);