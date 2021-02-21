import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Header from './components/Header';
import Progress from './components/Progress';

const LazyMarketingApp = lazy(() => import('./components/MarketingApp'));
const LazyAuthApp = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
    productionPrefix: 'co',
});

export default function App() {

    const [isSignedIn, setSignedIn] = useState(false);

    const handleSignIn = () => {
        setSignedIn(true);
    };

    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header signedIn={isSignedIn} onSignOut={() => setSignedIn(false) } />
                    <Suspense fallback={<Progress/>}>
                        <Switch>
                            <Route path='/auth'>
                                <LazyAuthApp onSignIn={handleSignIn} />
                            </Route>
                            <Route path='/' component={LazyMarketingApp} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    );
}