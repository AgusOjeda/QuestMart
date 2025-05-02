import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { LatLngExpression, LatLngBounds } from 'leaflet';

export function useFitMapToMarkers(userLocation: LatLngExpression | null, defaultPosition: LatLngExpression) {
    const map = useMap();

    useEffect(() => {
        if (userLocation) {
            const bounds = new LatLngBounds([defaultPosition, userLocation]);
            map.fitBounds(bounds, { padding: [50, 50] });
        } else {
            map.setView(defaultPosition, 17); 
        }
    }, [map, userLocation, defaultPosition]);
}
