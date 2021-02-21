import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Header from './components/Header';
import Progress from './components/Progress';

const LazyMarketingApp = lazy(() => import('./components/MarketingApp'));
const LazyAuthApp = lazy(() => import('./components/AuthApp'));
const LazyDashboardApp = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});

const history = createBrowserHistory();

export default function App() {

    const [isSignedIn, setSignedIn] = useState(false);

    useEffect(() => {
        if (isSignedIn) {
            history.push('/dashboard');
        }
    }, [isSignedIn]);

    const handleSignIn = () => {
        setSignedIn(true);
    };

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header signedIn={isSignedIn} onSignOut={() => setSignedIn(false) } />
                    <Suspense fallback={<Progress/>}>
                        <Switch>
                            <Route path="/auth">
                                <LazyAuthApp onSignIn={handleSignIn} />
                            </Route>
                            <Route path="/dashboard">
                                { !isSignedIn && <Redirect to="/" /> }
                                <LazyDashboardApp />
                            </Route>
                            <Route path="/" component={LazyMarketingApp} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    );
}