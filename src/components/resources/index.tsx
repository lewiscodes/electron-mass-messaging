import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { IpcRendererEvent } from 'electron/main';
import { IResource } from '../../store/types/resources';
import { useDispatch, useSelector } from 'react-redux';
import { setResources } from '../../store/actions/resources';
import { IReduxStore } from '../../store/types';
import useInterval from '../../hooks/useInterval';

const Resources = (): JSX.Element => {
    const dispatch = useDispatch();
    const resources = useSelector((state: IReduxStore) => state.resources.items);
    const [tableBody, setTableBody] = useState(<tbody></tbody>);

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

    useInterval(() => {
        setTableBody(<tbody>
            {resources.map(resource => <tr key={resource.id}>
                <td>{resource.id}</td>
                <td>{resource.cs}</td>
                <td>{resource.ct}</td>
                <td>{resource.type}</td>
                <td>{resource.status}</td>
                <td>{`${resource.location[0]}, ${resource.location[1]}`}</td>
                <td>{resource.travelTime}</td>
                <td>{resource.eta}</td>
                <td>{resource.distance}</td>
                <td>{resource.station}</td>
            </tr>)}
        </tbody>)
    }, 1000);

    if (resources.length) {
        return (
            <table>
                <thead>
                    <tr>
                        {Object.keys(resources[0]).map(header => <td key={header}>{header}</td>)}
                    </tr>
                </thead>
                {tableBody}
            </table>
        );
    }

    return <React.Fragment />
};

export default Resources;