import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './ContactMap.css';
import { useFitMapToMarkers } from '../hooks/useFitMapToMarkers';

const defaultPosition: LatLngExpression = [-34.9214, -57.9544];

const FitMapLogic = ({
    userLocation,
    defaultPosition
}: {
    userLocation: LatLngExpression | null;
    defaultPosition: LatLngExpression;
}) => {
    useFitMapToMarkers(userLocation, defaultPosition);
    return null;
};

const ContactMap = () => {
    const [userLocation, setUserLocation] = useState<LatLngExpression | null>(null);
    const [isMapReady, setIsMapReady] = useState(false); 

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([
                        position.coords.latitude,
                        position.coords.longitude,
                    ]);
                },
                (error) => {
                    console.error('Error obteniendo la ubicación del usuario:', error);
                }
            );
        } else {
            alert('Tu navegador no soporta geolocalización');
        }
    }, []);

    return (
        <div className="contact-map-container">
            <MapContainer
                center={defaultPosition}
                zoom={17}
                className="custom-leaflet-map"
                whenReady={() => setIsMapReady(true)} 
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={defaultPosition}>
                    <Popup>
                        <strong>QuestMart</strong><br />
                        Dirección: Calle 14 entre 51 y 53, La Plata, Buenos Aires<br />
                        Horario: Lunes a Viernes de 9:00 a 18:00
                    </Popup>
                </Marker>
                {userLocation && (
                    <Marker position={userLocation}>
                        <Popup>Tu ubicación</Popup>
                    </Marker>
                )}
                {isMapReady && (
                    <FitMapLogic userLocation={userLocation} defaultPosition={defaultPosition} />
                )}
            </MapContainer>
        </div>
    );
};

export default ContactMap;
