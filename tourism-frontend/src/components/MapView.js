import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getMonuments, getTouristSites } from '../services/api';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function MapView() {
  const [monuments, setMonuments] = useState([]);
  const [touristSites, setTouristSites] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const monumentsData = await getMonuments();
      const touristSitesData = await getTouristSites();
      setMonuments(monumentsData);
      setTouristSites(touristSitesData);
    } catch (error) {
    }
  };

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {monuments.map((monument) => (
        <Marker key={monument.id} position={[monument.latitude, monument.longitude]}>
          <Popup>{monument.name}</Popup>
        </Marker>
      ))}
      {touristSites.map((site) => (
        <Marker key={site.id} position={[site.latitude, site.longitude]}>
          <Popup>{site.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;