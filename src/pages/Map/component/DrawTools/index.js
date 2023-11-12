import React, { useCallback, useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import { Icon } from 'leaflet';
import { Map, TileLayer, Marker, Popup, FeatureGroup, Circle } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import image from '~/assets/images';
import classNames from 'classnames/bind';
import styles from '../../Map.module.scss';
import hash from 'object-hash';

const { stringify } = require('wkt');

const cx = classNames.bind(styles);

const customIcon = new Icon({
    iconUrl: image.point,
    iconSize: [38, 38],
});

const DrawTools = ({ onCreated, onEdited }) => {
    const [additionalEleMap, setAdditionalEleMap] = useState([]);

    const handleEditLayer = (llId, newWkt) => {
        console.log(additionalEleMap);
        if (additionalEleMap.some((item) => item.id === llId)) {
            // Use a callback function as the argument of setState
            setAdditionalEleMap((currentState) => {
                // Create a copy of the current state array using map
                const updatedArray = currentState.map((item) => {
                    // If the item id matches, return a new object with the updated wkt
                    if (item.id === +llId) {
                        return { ...item, wkt: newWkt };
                    }
                    // Otherwise, return the original item
                    return item;
                });
                // Return the updated array
                return updatedArray;
            });
        }
    };

    const handleCreateLayer = (layerInfo) => {
        setAdditionalEleMap((currentState) => {
            return [...currentState, layerInfo];
        });
    };

    const _onEdited = (e) => {
        let numEdited = 0;
        e.layers.eachLayer((layer) => {
            numEdited += 1;
            handleEditLayer(layer._leaflet_id, stringify(layer.toGeoJSON()));
            //console.log(additionalEleMap);
        });
        console.log(`_onEdited: edited ${numEdited} layers`, e);
        // this._onChange();
    };

    const _onCreated = (e) => {
        let type = e.layerType;
        let layer = e.layer;
        if (type === 'marker') {
            // Do marker specific actions
            console.log('_onCreated: marker created', e);
        } else {
            console.log('_onCreated: something else created:', type, e);
        }

        //console.log('Geojson', layer.toGeoJSON());

        const container = L.DomUtil.create('form', 'leaflet-distance');
        const input = L.DomUtil.create('input', cx('input-popup'), container);
        const button = L.DomUtil.create('input', cx('btn-popup'), container);
        button.setAttribute('value', 'Submit');
        button.setAttribute('type', 'button');

        let inputValue = '';
        input.addEventListener('change', (e) => {
            inputValue = e.target.value;
        });

        button.addEventListener('click', () => {
            input.setAttribute('value', inputValue);
            const geoJson = layer.toGeoJSON();
            //geoJson.properties.name = inputValue;
            //console.log(layer);
            handleCreateLayer({ id: layer._leaflet_id, name: inputValue, wkt: stringify(geoJson) });
            //console.log({ id: layer._leaflet_id, name: inputValue, wkt: stringify(geoJson) });
            layer.closePopup();
        });

        e.layer.bindPopup(container).openPopup();

        //console.log('coords', layer.getLatLngs());
        // Do whatever else you need to. (save to db; etc)

        // this._onChange();
    };

    const _onDeleted = (e) => {
        let numDeleted = 0;
        e.layers.eachLayer((layer) => {
            numDeleted += 1;
        });
        console.log(`onDeleted: removed ${numDeleted} layers`, e);

        // this._onChange();
    };

    console.log(additionalEleMap);

    const _onMounted = (drawControl) => {
        console.log('_onMounted', drawControl);
    };

    const _onEditStart = (e) => {
        console.log('_onEditStart', e);
    };

    const _onEditStop = (e) => {
        console.log('_onEditStop', e);
    };

    const _onDeleteStart = (e) => {
        console.log('_onDeleteStart', e);
    };

    const _onDeleteStop = (e) => {
        console.log('_onDeleteStop', e);
    };

    const _onDrawStart = (e) => {
        console.log('_onDrawStart', e);
    };

    /*onEdited	function	hook to leaflet-draw's draw:edited event
onCreated	function	hook to leaflet-draw's draw:created event
onDeleted	function	hook to leaflet-draw's draw:deleted event
onMounted	function	hook to leaflet-draw's draw:mounted event
onEditStart	function	hook to leaflet-draw's draw:editstart event
onEditStop	function	hook to leaflet-draw's draw:editstop event
onDeleteStart	function	hook to leaflet-draw's draw:deletestart event
onDeleteStop	function	hook to leaflet-draw's draw:deletestop event
onDrawStart	function	hook to leaflet-draw's draw:drawstart event
onDrawStop	function	hook to leaflet-draw's draw:drawstop event
onDrawVertex	function	hook to leaflet-draw's draw:drawvertex event
onEditMove	function	hook to leaflet-draw's draw:editmove event
onEditResize	function	hook to leaflet-draw's draw:editresize event
onEditVertex	function	hook to leaflet-draw's draw:editvertex event*/
    return (
        <FeatureGroup>
            <EditControl
                key={hash(additionalEleMap)}
                onDrawStart={_onDrawStart}
                position="topright"
                onEdited={_onEdited}
                onCreated={_onCreated}
                onDeleted={_onDeleted}
                draw={{
                    marker: {
                        icon: customIcon,
                    },
                    polyline: {
                        icon: new L.DivIcon({
                            iconSize: new L.Point(8, 8),
                            className: 'leaflet-div-icon leaflet-editing-icon',
                        }),
                        shapeOptions: {
                            guidelineDistance: 10,
                            color: 'navy',
                            weight: 3,
                        },
                    },
                    rectangle: false,
                    circlemarker: false,
                    circle: false,
                    polygon: false,
                }}
            />
        </FeatureGroup>
    );
};

export default DrawTools;
