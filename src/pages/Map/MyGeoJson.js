import { GeoJSON } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import { useMap } from 'react-leaflet';
import hash from 'object-hash';
import images from '~/assets/images';
import { useState } from 'react';

const customIcon = new Icon({
    iconUrl: images.point,
    iconSize: [38, 38],
});

function MyGeoJson({ data, pointz = false, isUse = false }) {
    const map = useMap();
    const polylineGroupInit = L.layerGroup().addTo(map);
    const [polylineGroup, setPolylineGroup] = useState(polylineGroupInit);
    if (!polylineGroup) {
        setPolylineGroup(polylineGroup);
    }

    polylineGroup.clearLayers();
    if (isUse === false) {
        pointz = false;
    }

    const onEachFeature = (feature, layer) => {
        if (feature.properties && feature.properties.Name_VI) {
            layer.bindPopup(
                `<h1>${feature.properties.Name_VI}</h1><h2 style={{ color: '#777' }}>Income: ${feature.properties.Income}</h2>`,
            );
        }

        if (feature.properties) {
            if (feature.properties.Name && !feature.properties.Distance) {
                layer.bindPopup(`<h2>${feature.properties.Name}</h2>`);
            }

            if (feature.properties.Name && feature.properties.Distance) {
                layer.bindPopup(
                    `<h2>${feature.properties.Name}</h2><p>Bạn đang cách điểm vừa click: ${feature.properties.Distance}m</p>`,
                );
            }
        }

        if (pointz !== false && pointz[0] !== 0 && pointz[1] !== 0) {
            let coords;
            let line;
            let geometryType = feature.geometry.type;

            // check geometry type and get coordinates accordingly
            if (geometryType === 'Point') {
                coords = feature.geometry.coordinates;
            } else if (geometryType === 'LineString') {
                coords = feature.geometry.coordinates[0]; // get first coordinate of line
            } else if (geometryType === 'Polygon') {
                coords = feature.geometry.coordinates[0][0]; // get first coordinate of outer ring
            } else {
                // handle other geometry types or skip feature
                return;
            }

            line = L.polyline([pointz, [coords[1], coords[0]]], { color: 'red', weight: 3 });
            polylineGroup.addLayer(line);
            //console.log(coords);
        }
    };

    const pointToLayer = (feature, latlng) => {
        return L.marker(latlng, { icon: customIcon });
    };
    return <GeoJSON key={hash(data)} data={data} onEachFeature={onEachFeature} pointToLayer={pointToLayer} />;
}

export default MyGeoJson;
