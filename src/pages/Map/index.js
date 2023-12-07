import { useCallback, useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, LayersControl, Polygon, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/images/marker-icon-2x.png';
import { Icon } from 'leaflet';
import image from '~/assets/images';
import axios from 'axios';
import classNames from 'classnames/bind';

// import { CustomComboBoxControl, CustomDistanceCalControl } from './CustomControl';
import styles from './Map.module.scss';
// import MapClickHandler from './MapClickHandler';
// import MyGeoJson from './MyGeoJson';
// import DrawTools from './component/DrawTools';

const cx = classNames.bind(styles);

const customIcon = new Icon({
    iconUrl: image.point,
    iconSize: [38, 38],
});

const customIcon2 = new Icon({
    iconUrl: image.point2,
    iconSize: [38, 38],
});

function Map() {
    // const [featureCollection, setFeatureCollection] = useState(null);
    // const [listMapEle, setListMapEle] = useState([]);
    // const [positionClicked, setPositionClicked] = useState([0, 0]);
    // const [isCalculateDistance, setIsCalculateDistance] = useState(false);
    // const [range, setRange] = useState(100);

    // useEffect(() => {
    //     const fetchApi = async () => {
    //         const jeoJsonDHCT = await axios.get('http://localhost:8072/api/v1/map/geojson');
    //         const responseMapEle = await axios.get('http://localhost:8072/api/v1/map/mapele');
    //         const temp = [];
    //         temp.push({ id: 'all', name: 'All' });
    //         responseMapEle.data.forEach((item) => {
    //             temp.push(item);
    //         });
    //         setListMapEle(temp);
    //         setFeatureCollection(jeoJsonDHCT.data);
    //     };

    //     fetchApi();
    // }, []);

    // const handleOptionChange = (value) => {
    //     const fetchApi = async () => {
    //         const newJeoJsonDHCT = await axios.get(`http://localhost:8072/api/v1/map/geojson/${value}`);
    //         setFeatureCollection(newJeoJsonDHCT.data);
    //     };
    //     fetchApi();
    // };

    // const handleClickMap = useCallback(
    //     ([lat, lng]) => {
    //         const fetchApi = async () => {
    //             const newJeoJsonDHCT = await axios.get(`http://localhost:8072/api/v1/map/geojson/distance`, {
    //                 params: {
    //                     lng: lng,
    //                     lat: lat,
    //                     range: range,
    //                 },
    //             });
    //             setFeatureCollection(newJeoJsonDHCT.data);
    //             setPositionClicked([lat, lng]);
    //         };
    //         fetchApi();
    //     },
    //     [range],
    // );

    // const handleDistance = () => {
    //     setIsCalculateDistance((prev) => {
    //         if (!prev === false) {
    //             handleOptionChange('all');
    //         }
    //         return !prev;
    //     });
    // };

    // const handleOnRangeChange = (value) => {
    //     setRange((prev) => value);
    // };

    //console.log(additionalEleMap);

    // return (
    //     <MapContainer center={[10.030249, 105.772097]} zoom={16} className={cx('wrapper')}>
    //         <TileLayer
    //             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //         />

    //         <LayersControl position="topright">
    //             <LayersControl.BaseLayer checked name="Map">
    //                 <TileLayer
    //                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //                 />
    //             </LayersControl.BaseLayer>
    //         </LayersControl>
    //         {listMapEle?.length > 0 && (
    //             <CustomComboBoxControl
    //                 position="topleft"
    //                 options={listMapEle}
    //                 onChange={(value) => {
    //                     handleOptionChange(value);
    //                 }}
    //             />
    //         )}
    //         <CustomDistanceCalControl
    //             position="topleft"
    //             onCalDistance={handleDistance}
    //             onInputDistanceChange={handleOnRangeChange}
    //         />
    //         {/* <GeoJSON data={geojsonData} onEachFeature={onEachFeature} /> */}

    //         <MyGeoJson
    //             data={featureCollection}
    //             point={positionClicked}
    //             pointz={positionClicked}
    //             isUse={isCalculateDistance}
    //         ></MyGeoJson>
    //         <DrawTools />

    //         {isCalculateDistance && <MapClickHandler onClickMap={handleClickMap} />}
    //         {isCalculateDistance && positionClicked?.length !== 0 && (
    //             <Marker position={positionClicked} icon={customIcon2}>
    //                 <Popup>
    //                     You clicked at {positionClicked[0]}, {positionClicked[1]}
    //                 </Popup>
    //             </Marker>
    //         )}
    //     </MapContainer>
    // );
    return <div>This page is under development. Please come back later.</div>;
}

export default Map;
