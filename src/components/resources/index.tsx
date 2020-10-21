import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { IpcRendererEvent } from 'electron/main';
import { IResource } from '../../../globalTypes/resources';
import { useDispatch, useSelector } from 'react-redux';
import { setResources } from '../../store/actions/resources';
import { IReduxStore } from '../../store/types';
import useInterval from '../../hooks/useInterval';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Resources = (): JSX.Element => {
    const dispatch = useDispatch();
    const resources = useSelector((state: IReduxStore) => state.resources.items);
    const [tableBody, setTableBody] = useState(<TableBody></TableBody>);

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
        setTableBody(<TableBody>
            {resources.map(resource => <TableRow key={resource.id}>
                <TableCell>{resource.id}</TableCell>
                <TableCell>{resource.cs}</TableCell>
                <TableCell>{resource.ct}</TableCell>
                <TableCell>{resource.type}</TableCell>
                <TableCell>{resource.status}</TableCell>
                <TableCell>{`${resource.location[0]}, ${resource.location[1]}`}</TableCell>
                <TableCell>{resource.travelTime}</TableCell>
                <TableCell>{resource.eta}</TableCell>
                <TableCell>{resource.distance}</TableCell>
                <TableCell>{resource.station}</TableCell>
            </TableRow>)}
        </TableBody>)
    }, 1000);

    if (resources.length) {
        return (
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {Object.keys(resources[0]).map(header => <TableCell key={header}>{header}</TableCell>)}
                    </TableRow>
                </TableHead>
                {tableBody}
            </Table>
        );
    }

    return <React.Fragment />
};

export default Resources;