import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Set up the default icon
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Set default icon for all markers
L.Marker.prototype.options.icon = DefaultIcon;

function MapView({ 
  center, 
  zoom, 
  accommodations = [],
  onMarkerClick,
  selectedAccommodation
}) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {accommodations.map((accommodation) => (
        <Marker
          key={`accommodation-${accommodation.id}`}
          position={[accommodation.latitude, accommodation.longitude]}
          eventHandlers={{
            click: () => onMarkerClick && onMarkerClick(accommodation)
          }}
          opacity={selectedAccommodation ? (selectedAccommodation.id === accommodation.id ? 1 : 0.5) : 1}
        >
          <Popup>
            <div>
              <h3>{accommodation.name}</h3>
              <p>{accommodation.type} in {accommodation.city_name}</p>
              <p>Rating: {accommodation.rating}/5</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;