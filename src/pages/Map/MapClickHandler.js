import { useMapEvents } from 'react-leaflet';

function MapClickHandler({ onClickMap }) {
    const map = useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            onClickMap([lat, lng]);
            console.log([lat, lng]);
        },
    });
    return null;
}

export default MapClickHandler;
