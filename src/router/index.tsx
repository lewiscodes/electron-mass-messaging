import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Map from '../components/map';

const ResourcePage = (): JSX.Element => (
    <div>Resource Page</div>
);

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
