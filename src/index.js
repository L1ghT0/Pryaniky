import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import {Provider} from 'react-redux'
import {store} from "./store/store";
import {HashRouter} from 'react-router-dom';
import './styles/index.css';

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    <Provider store={store}>
        <HashRouter>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </HashRouter>
    </Provider>
)