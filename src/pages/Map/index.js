import { useEffect, useLayoutEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, useMap, Marker, Popup, FeatureGroup, LayersControl } from 'react-leaflet';
import { Polygon } from 'react-leaflet/Polygon';
import { GeoJSON } from 'react-leaflet/GeoJSON';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon-2x.png';
import userEvent from '@testing-library/user-event';
import { Icon } from 'leaflet';
import image from '~/assets/images';
import axios from 'axios';
import classNames from 'classnames/bind';
import hash from 'object-hash';

import CustomControl from './CustomControl';
import styles from './Map.module.scss';

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

// Swap the coordinates of a GeoJSON object
function swapCoordinates(geojson) {
    // Check if the input is a valid GeoJSON object
    if (geojson && geojson.type) {
        // If it is a FeatureCollection, loop through the features
        if (geojson.type === 'FeatureCollection') {
            geojson.features.forEach(function (feature) {
                swapCoordinates(feature);
            });
        }
        // If it is a Feature, swap the coordinates of the geometry
        else if (geojson.type === 'Feature') {
            geojson.geometry = swapCoordinates(geojson.geometry);
        }
        // If it is a Geometry, swap the coordinates according to the type
        else if (geojson.type === 'Point') {
            geojson.coordinates.reverse();
        } else if (geojson.type === 'LineString' || geojson.type === 'MultiPoint') {
            geojson.coordinates.forEach(function (coordinate) {
                coordinate.reverse();
            });
        } else if (geojson.type === 'Polygon' || geojson.type === 'MultiLineString') {
            geojson.coordinates.forEach(function (ring) {
                ring.forEach(function (coordinate) {
                    coordinate.reverse();
                });
            });
        } else if (geojson.type === 'MultiPolygon') {
            geojson.coordinates.forEach(function (polygon) {
                polygon.forEach(function (ring) {
                    ring.forEach(function (coordinate) {
                        coordinate.reverse();
                    });
                });
            });
        }
        // If it is a GeometryCollection, loop through the geometries
        else if (geojson.type === 'GeometryCollection') {
            geojson.geometries.forEach(function (geometry) {
                geometry = swapCoordinates(geometry);
            });
        }
    }
    // Return the modified GeoJSON object
    return geojson;
}

function parseGeometry(feature) {
    const geometry = JSON.parse(feature.geometry);
    feature.geometry = geometry;
    return feature;
}

function parseApiResponse(apiResponse) {
    const parsedFeatures = apiResponse.features.map(parseGeometry);
    return {
        ...apiResponse,
        features: parsedFeatures,
    };
}

const customIcon = new Icon({
    iconUrl: image.point,
    iconSize: [38, 38],
});

function Map() {
    // Tạo một state để lưu lại
    // Ý chính là để mỗi khi nó re-render lại giao diện, biến featureCollection không bị khai báo lại.
    // Tức là lưu lại giá trị biến featureCollection dù nó có re-render
    // setFeatureCollection là một hàm để set giá trị cho biến featureCollection
    const [featureCollection, setFeatureCollection] = useState(null);
    const [listMapEle, setListMapEle] = useState([]);

    useEffect(() => {
        // hàm call api để lấy kết quả
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

    //console.log(featureCollection);
    //console.log('test', listMapEle);

    const renderFeatures = (geojsonString) => {
        const listGeoFeature = geojsonString.features.map((item, index) => {
            let Type = item.geometry.type;
            if (Type === 'Point') {
                Type = Marker;
                return (
                    <Type key={item.properties.id} icon={customIcon} position={item.geometry.coordinates}>
                        <Popup>
                            <h2>{item.properties.name}</h2>
                        </Popup>
                    </Type>
                );
            }

            if (Type === 'Polygon') {
                Type = Polygon;
                return (
                    <Type key={item.properties.id} positions={item.geometry.coordinates}>
                        <Popup>
                            <h2>{item.properties.name}</h2>
                        </Popup>
                    </Type>
                );
            }
        });

        return listGeoFeature;
    };

    const onEachFeature = (feature, layer) => {
        //console.log(feature);
        // Check if the feature has a name property
        if (feature.properties && feature.properties.Name_VI) {
            // Bind a popup with the name as the content
            layer.bindPopup(
                `<h1>${feature.properties.Name_VI}</h1><h2 style={{ color: '#777' }}>Income: ${feature.properties.Income}</h2>`,
            );
        }

        if (feature.properties && feature.properties.Name) {
            // Bind a popup with the name as the content
            layer.bindPopup(`<h1>${feature.properties.Name}</h1>`);
        }
        //layer.bindPopup('fwafwef');
    };

    const pointToLayer = (feature, latlng) => {
        // Create a new marker using L.marker and pass the custom icon as an option
        return L.marker(latlng, { icon: customIcon });
    };

    const handleOptionChange = (value) => {
        const fetchApi = async () => {
            const newJeoJsonDHCT = await axios.get(`http://localhost:8072/api/v1/map/geojson/${value}`);
            setFeatureCollection(newJeoJsonDHCT.data);
        };
        fetchApi();
    };

    console.log(featureCollection);

    return (
        <div>
            <MapContainer center={[10.030249, 105.772097]} zoom={16} style={{ width: '100vw', height: '100vh' }}>
                {/* <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                /> */}
                {listMapEle?.length > 0 && (
                    <CustomControl
                        position="topright"
                        options={listMapEle}
                        onChange={(value) => {
                            handleOptionChange(value);
                        }}
                    />
                )}
                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="Map">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>
                {/* <GeoJSON data={geojsonData} onEachFeature={onEachFeature} /> */}
                <GeoJSON
                    key={hash(featureCollection)}
                    data={featureCollection}
                    onEachFeature={onEachFeature}
                    pointToLayer={pointToLayer}
                />

                {/* {renderFeatures(points)} */}
                {/* <Marker position={[105.772097, 10.030249]} icon={customIcon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker> */}
            </MapContainer>
        </div>
    );
}

export default Map;
