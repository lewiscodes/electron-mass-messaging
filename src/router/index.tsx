import React from 'react';
import { ipcRenderer } from 'electron';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Map from '../components/map';
import { IpcRendererEvent } from 'electron/main';
import { IResource } from '../../types/resources'

const ResourcePage = (): JSX.Element => (
    <div>Resource Page</div>
);

const AppRouter = (): JSX.Element => {
    ipcRenderer.send('RESOURCES_SUBSCRIBE');
    ipcRenderer.on('RESOURCES_SUBSCRIBE_RESPONSE', (_e: IpcRendererEvent, args: IResource) => {
        console.log('RESOURCES_SUBSCRIBE_RESPONSE', args);
    });
    ipcRenderer.on('RESOURCES_UPDATE', (_e: IpcRendererEvent, args: IResource) => {
        console.log('RESOURCES_UPDATE', args);
    });

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
