export const swapCoordinates = (geojson) => {
    // Make a copy of the geojson object
    let swapped = JSON.parse(JSON.stringify(geojson));
    // Loop through all features
    for (let feature of swapped.features) {
        // Get the geometry type
        let type = feature.geometry.type;
        // Get the coordinates array
        let coords = feature.geometry.coordinates;
        // Swap the order of coordinates depending on the geometry type
        if (type === 'Point') {
            coords.reverse();
        } else if (type === 'LineString' || type === 'MultiPoint') {
            for (let coord of coords) {
                coord.reverse();
            }
        } else if (type === 'Polygon' || type === 'MultiLineString') {
            for (let ring of coords) {
                for (let coord of ring) {
                    coord.reverse();
                }
            }
        } else if (type === 'MultiPolygon') {
            for (let polygon of coords) {
                for (let ring of polygon) {
                    for (let coord of ring) {
                        coord.reverse();
                    }
                }
            }
        }
    }
    // Return the swapped geojson object
    return swapped;
};
