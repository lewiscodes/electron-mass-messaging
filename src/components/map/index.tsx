import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View, MapBrowserEvent } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const MapPage = ({ children }: { children: JSX.Element }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const map: Map = new Map({
            target: mapRef.current!,
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: [-672.11954868456, 6711488.817310899],
                zoom: 13
            })
        });

        map.on('click', (e: MapBrowserEvent) => {
            console.log('clickedMap', e.coordinate);
        })

        // top-left : -11062.3302079881, 6719826.438613703
        // top-right : 15870.891661879545, 6719811.034488744
        // bottom-right : 15832.617163585379, 6703622.7256046
        // bottom-left : -17248.178584805773, 6703303.85387326

    }, []);

    return (
        <div
            ref={mapRef}
            style={{ width: "100%", height: "100vh" }}
        >{children}</div>
    );
};

export default MapPage;