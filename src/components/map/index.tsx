import React, { useState, useEffect, useRef, Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ipcRenderer } from 'electron';
import { IpcRendererEvent } from 'electron/main';
import 'ol/ol.css';
import { Map, View, MapBrowserEvent, Feature } from 'ol';
import { setResources } from '../../store/actions/resources';
import { IResource } from '../../store/types/resources';
import { IReduxStore } from '../../store/types';
import {Circle as CircleStyle, Fill, RegularShape, Stroke, Style} from 'ol/style';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import Point from 'ol/geom/Point';

const MapPage = ({ children }: { children: JSX.Element }) => {
    const dispatch: Dispatch<any> = useDispatch();
    const mapRef = useRef(null);
    const resources = useSelector((state: IReduxStore) => state.resources.items);
    const [map, setMap] = useState<Map>();
    const [vectorLayer, setVectorLayer] = useState<VectorLayer>()

    useEffect(() => {
        ipcRenderer.send('RESOURCES_SUBSCRIBE');
        ipcRenderer.on('RESOURCES_SUBSCRIBE_RESPONSE', (_e: IpcRendererEvent, args: { items: IResource[]}) => {
            dispatch(setResources(args.items));
        });
        ipcRenderer.on('RESOURCES_UPDATE', (_e: IpcRendererEvent, args: { items: IResource[] }) => {
            dispatch(setResources(args.items));
        });

        const source = new VectorSource();
        const vector = new VectorLayer({
            source: source
        });

        const map: Map = new Map({
            target: mapRef.current!,
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                vector
            ],
            view: new View({
                center: [-672.11954868456, 6711488.817310899],
                zoom: 13
            })
        });

        setMap(map);
        setVectorLayer(vector);

        map.on('click', (e: MapBrowserEvent) => {
            console.log('clickedMap', e.coordinate);
        });

        return () => {
            ipcRenderer.send('UNSUBSCRIBE');
        }
    }, []);

    useEffect(() => {
        const source = new VectorSource();
        const vector = new VectorLayer({
            source: source
        });

        resources.forEach(resource => {
            const point = new Point(resource.location);
            const feature = new Feature(point);
            feature.setStyle(calculateResourceStyle(resource));
            source.addFeature(feature);
        });

        map?.removeLayer(vectorLayer!);
        map?.addLayer(vector);
        setVectorLayer(vector);
    }, [resources]);

    const calculateResourceStyle = (resource: IResource) => {
        const color = calculateResourceColor(resource);
        const fill = new Fill({color});

        switch (resource.type) {
            case 'CID':
                return new Style({
                    image: new RegularShape({
                        fill,
                        points: 4,
                        radius: 10,
                        angle: Math.PI / 4,
                    })
                });
            case 'RC':
                return new Style({
                    image: new RegularShape({
                        fill,
                        points: 3,
                        radius: 10,
                        rotation: Math.PI / 4,
                        angle: 0,
                    })
                });
            case 'PCSO':
                return new Style({
                    image: new RegularShape({
                        fill,
                        points: 5,
                        radius: 10,
                        radius2: 4,
                        angle: 0,
                    })
                });
            case 'COD':
                return new Style({
                    image: new CircleStyle({
                        radius: 5,
                        fill,
                    })
                });
            case 'CIS':
                return new Style({
                    image: new CircleStyle({
                        radius: 5,
                        fill,
                    })
                })
        }
    }

    const calculateResourceColor = (resource: IResource) => {
        switch (resource.status) {
            case '05':
                return 'red'
            case '02':
                return 'blue'
            case '06':
                return 'green'
            case 'AS':
                return 'orange'
        }
    };

    return (
        <div
            ref={mapRef}
            style={{ width: "100%", height: "100vh" }}
        >{children}</div>
    );
};

export default MapPage;