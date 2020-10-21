import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { IpcRendererEvent } from 'electron/main';
import { IResource } from '../../../globalTypes/resources';
import { useDispatch, useSelector } from 'react-redux';
import { setResources } from '../../store/actions/resources';
import { IReduxStore } from '../../store/types';

const Resources = (): JSX.Element => {
    const dispatch = useDispatch();
    const resources = useSelector((state: IReduxStore) => state.resources.items);

    useEffect(() => {
        ipcRenderer.send('RESOURCES_SUBSCRIBE');

        ipcRenderer.on('RESOURCES_SUBSCRIBE_RESPONSE', (_e: IpcRendererEvent, args: { items: IResource[]}) => {
            dispatch(setResources(args.items));
        });

        ipcRenderer.on('RESOURCES_UPDATE', (_e: IpcRendererEvent, args: { items: IResource[] }) => {
            dispatch(setResources(args.items));
        });

        return () => {
            ipcRenderer.send('UNSUBSCRIBE');
        }
    }, []);

    return (
        <React.Fragment>
            <div>Resource Page</div>
        </React.Fragment>
    );
};

export default Resources;