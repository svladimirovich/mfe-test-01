import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// Mount function to start up the app
function mount(element, { onNavigate, onSignIn, devHistory, initialPath }) {
    const history = devHistory || createMemoryHistory({
        initialEntries: [initialPath],
    });
    if (onNavigate) {
        history.listen(onNavigate);
    }
    ReactDOM.render(
        <App history={history} onSignIn={() => {
            onSignIn && onSignIn();
        }} />,
        element
    );
    return {
        onParentNavigate({ pathname }) {
            if (pathname !== history.location.pathname) {
                history.push(pathname);
            }
        },
    };
}

// if we are in development and in isolation call mount immediately
if (process.env.NODE_ENV === 'development') {
    const DEV_ELEMENT_ID = "dev-auth-app";
    const appElement = document.getElementById(DEV_ELEMENT_ID);
    if (appElement) {
        mount(appElement, { devHistory: createBrowserHistory() });
    }
}

// we are running through container and we should export the mount function
export { mount };