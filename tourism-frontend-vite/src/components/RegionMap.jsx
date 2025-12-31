import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;

// Create custom icons for monuments and tourist sites
const monumentIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const touristSiteIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'tourist-site-marker'
});

// Add CSS styles for the tourist site marker
const markerStyles = `
  .tourist-site-marker {
    filter: hue-rotate(120deg);
  }
  
  .map-legend {
    padding: 6px 10px;
    background: white;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    font-size: 12px;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 3px;
  }
  
  .legend-item:last-child {
    margin-bottom: 0;
  }
  
  .legend-marker {
    width: 12px;
    height: 20px;
    margin-right: 6px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  
  .legend-marker.monument {
    background-image: url(${require('leaflet/dist/images/marker-icon.png')});
  }
  
  .legend-marker.tourist-site {
    background-image: url(${require('leaflet/dist/images/marker-icon.png')});
    filter: hue-rotate(120deg);
  }
`;

function RegionMap({ markers, center, zoom, onMarkerClick, selectedMarker }) {
  return (
    <>
      <style>{markerStyles}</style>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker) => (
          <Marker
            key={`${marker.type}-${marker.id}`}
            position={marker.position}
            icon={marker.type === 'monument' ? monumentIcon : touristSiteIcon}
            eventHandlers={{
              click: () => onMarkerClick(marker.type, marker.id),
            }}
          >
            <Popup>
              <div>
                <strong>{marker.title}</strong>
                <br />
                {marker.type === 'monument' ? 'Monument' : 'Tourist Site'}
              </div>
            </Popup>
          </Marker>
        ))}
        <div className="map-legend" style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          zIndex: 1000
        }}>
          <div className="legend-item">
            <div className="legend-marker monument"></div>
            <span>Monuments</span>
          </div>
          <div className="legend-item">
            <div className="legend-marker tourist-site"></div>
            <span>Tourist Sites</span>
          </div>
        </div>
      </MapContainer>
    </>
  );
}

export default RegionMap;