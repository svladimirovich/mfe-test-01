import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';

// Mount function to start up the app
function mount(element) {
    const app = createApp(Dashboard);
    app.mount(element);
}

// if we are in development and in isolation call mount immediately
if (process.env.NODE_ENV === 'development') {
    const DEV_ELEMENT_ID = "dev-dashboard-app";
    const appElement = document.getElementById(DEV_ELEMENT_ID);
    if (appElement) {
        mount(appElement);
    }
}

// we are running through container and we should export the mount function
export { mount };