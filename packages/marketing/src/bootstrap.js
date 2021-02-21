import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// Mount function to start up the app
function mount(element, { onNavigate, devHistory }) {
    const history = devHistory || createMemoryHistory();
    if (onNavigate) {
        history.listen(onNavigate);
    }
    ReactDOM.render(
        <App history={history} />,
        element
    );
    return {
        onParentNavigate({ pathname }) {
            if (pathname !== history.location.pathname) {
                history.push(pathname);
            }
        }
    };
}

// if we are in development and in isolation call mount immediately
if (process.env.NODE_ENV === 'development') {
    const DEV_ELEMENT_ID = "dev-marketing-app";
    const appElement = document.getElementById(DEV_ELEMENT_ID);
    if (appElement) {
        mount(appElement, { devHistory: createBrowserHistory() });
    }
}

// we are running through container and we should export the mount function
export { mount };