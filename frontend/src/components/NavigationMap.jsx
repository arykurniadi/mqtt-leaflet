import React, { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

const NavigationMap = () => {
  const origin = [-6.1787782220076775, 106.69950637068156];
  const destination = [-6.127985, 106.613733];

  useEffect(() => {
    const map = L.map('map').setView(origin, 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.Routing.control({
      waypoints: [
        L.latLng(origin[0], origin[1]),
        L.latLng(destination[0], destination[1])
      ],
      lineOptions: {
        styles: [
          {
            color: "blue",
            weight: 4,
            opacity: 0.7,
          },
        ],
      },
      routeWhileDragging: true
    }).addTo(map);
  }, []);

  return <div id="map" style={{ height: '100vh', width: '100vw' }}></div>;
};

export default NavigationMap;
