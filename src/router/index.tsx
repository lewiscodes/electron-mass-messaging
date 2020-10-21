import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Map from '../components/map';
import ResourcePage from '../components/resources';

const AppRouter = (): JSX.Element => {
    return (
        <Router>
            <Switch>
                <Route path="/map" component={Map} />
                <Route path="/resource" component={ResourcePage} />
            </Switch>
        </Router>
    );
};

export default AppRouter;
