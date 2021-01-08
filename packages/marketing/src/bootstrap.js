import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Mount function to start up the app
function mount(element) {
    ReactDOM.render(
        <App />,
        element
    );
}

// if we are in development and in isolation call mount immediately
if (process.env.NODE_ENV === 'development') {
    const DEV_ELEMENT_ID = "dev-marketing-app";
    const appElement = document.getElementById(DEV_ELEMENT_ID);
    if (appElement) {
        mount(appElement);
    } else {
        console.error(`Error: could not locate '#${DEV_ELEMENT_ID}' element to bind application to!`)
    }
}

// we are running through container and we should export the mount function
export { mount };