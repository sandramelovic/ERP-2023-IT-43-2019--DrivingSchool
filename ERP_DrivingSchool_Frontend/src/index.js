import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { CometChat } from '@cometchat-pro/chat';
import config from './config';
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

CometChat.init(config.appID, new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(config.region).build()).then(
  () => {
    console.log("Initialization successfully")
  },
  error => {
    console.log("Initialization failed wit error:", error)
  }
)

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
             <App />
        </AlertProvider>
    </Provider>
    
);

