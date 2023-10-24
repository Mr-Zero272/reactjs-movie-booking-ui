import { useCallback, useEffect, useState } from 'react';
import L from 'leaflet';
import {
    MapContainer,
    TileLayer,
    useMap,
    Marker,
    Popup,
    FeatureGroup,
    LayersControl,
    Polygon,
    Polyline,
} from 'react-leaflet';
import { GeoJSON } from 'react-leaflet/GeoJSON';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon-2x.png';
import { useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import image from '~/assets/images';
import axios from 'axios';
import classNames from 'classnames/bind';
import hash from 'object-hash';

import CustomControl from './CustomControl';
import styles from './Map.module.scss';
import MapClickHandler from './MapClickHandler';
import { swapCoordinates } from './GeoHelpers/SwapCoordinates';

const cx = classNames.bind(styles);

const geojsonData = require('~/assets/a.json');

let testGeoJson = {
    features: [
        {
            geometry: JSON.parse('{"type":"Point","coordinates":[105.772097,10.030249]}'),
            type: 'Feature',
            properties: {
                Name: 'Cong A Dai Hoc Can Tho',
            },
        },
        {
            geometry: JSON.parse('{"type":"Point","coordinates":[105.771051,10.029072]}'),
            type: 'Feature',
            properties: {
                Name: 'Cong B Dai Hoc Can Tho',
            },
        },
    ],
    type: 'FeatureCollection',
};

const customIcon = new Icon({
    iconUrl: image.point,
    iconSize: [38, 38],
});

const customIcon2 = new Icon({
    iconUrl: image.point2,
    iconSize: [38, 38],
});

function Map() {
    const [featureCollection, setFeatureCollection] = useState(null);
    const [listMapEle, setListMapEle] = useState([]);
    const [positionClicked, setPositionClicked] = useState([0, 0]);

    useEffect(() => {
        const fetchApi = async () => {
            const jeoJsonDHCT = await axios.get('http://localhost:8072/api/v1/map/geojson');
            const responseMapEle = await axios.get('http://localhost:8072/api/v1/map/mapele');
            const temp = [];
            temp.push({ id: 'all', name: 'All' });
            responseMapEle.data.forEach((item) => {
                temp.push(item);
            });
            setListMapEle(temp);
            setFeatureCollection(jeoJsonDHCT.data);
        };

        fetchApi();
    }, []);

    const onEachFeature = (feature, layer) => {
        if (feature.properties && feature.properties.Name_VI) {
            layer.bindPopup(
                `<h1>${feature.properties.Name_VI}</h1><h2 style={{ color: '#777' }}>Income: ${feature.properties.Income}</h2>`,
            );
        }

        if (feature.properties && feature.properties.Name) {
            layer.bindPopup(`<h1>${feature.properties.Name}</h1>`);
        }
    };

    const pointToLayer = (feature, latlng) => {
        return L.marker(latlng, { icon: customIcon });
    };

    const handleOptionChange = (value) => {
        const fetchApi = async () => {
            const newJeoJsonDHCT = await axios.get(`http://localhost:8072/api/v1/map/geojson/${value}`);
            setFeatureCollection(newJeoJsonDHCT.data);
        };
        fetchApi();
    };

    const handleClickMap = useCallback(([lat, lng]) => {
        setPositionClicked([lat, lng]);
    }, []);

    if (featureCollection) {
        console.log(swapCoordinates(featureCollection));
    }

    return (
        <MapContainer center={[10.030249, 105.772097]} zoom={16} style={{ width: '100vw', height: '100vh' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="Map">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {listMapEle?.length > 0 && (
                        <CustomControl
                            position="topleft"
                            options={listMapEle}
                            onChange={(value) => {
                                handleOptionChange(value);
                            }}
                        />
                    )}
                </LayersControl.BaseLayer>
            </LayersControl>
            {/* <GeoJSON data={geojsonData} onEachFeature={onEachFeature} /> */}
            <GeoJSON
                key={hash(featureCollection)}
                data={featureCollection}
                onEachFeature={onEachFeature}
                pointToLayer={pointToLayer}
            />
            <MapClickHandler onClickMap={handleClickMap} />
            {positionClicked && (
                <Marker position={positionClicked} icon={customIcon2}>
                    <Popup>
                        You clicked at {positionClicked[0]}, {positionClicked[1]}
                    </Popup>
                </Marker>
            )}
            <Polygon
                positions={[
                    [10.031368, 105.770971],
                    [10.030749, 105.771513],
                    [10.032028, 105.771534],
                    [10.031513, 105.77202],
                ]}
            >
                <Popup>Day la vuon bang</Popup>
            </Polygon>

            {positionClicked && (
                <Polyline
                    positions={[
                        positionClicked,
                        [10.031368, 105.770971],
                        [10.030749, 105.771513],
                        [10.032028, 105.771534],
                        [10.031513, 105.77202],
                    ]}
                ></Polyline>
            )}
        </MapContainer>
    );
}

export default Map;
