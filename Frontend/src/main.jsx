import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux"
import {createStore} from "redux";
import {composeWithDevTools} from "@redux-devtools/extension"
import rootReducer from './reducers';
import { BrowserRouter } from 'react-router-dom'


const store = createStore(rootReducer, composeWithDevTools());


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
  </React.StrictMode>
)
