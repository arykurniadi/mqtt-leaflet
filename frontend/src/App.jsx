import "./App.scss";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import mqttClient from "./config/mqtt";
import { useEffect, useState } from "react";
import polyline from "@mapbox/polyline";

function App() {
  const origin = [-6.178795, 106.699615];
  const destination = [-6.127985, 106.613733];

  const [isConnected, setIsConnected] = useState(false);
  const [center, setCenter] = useState(origin);
  const [pos, setpos] = useState(origin);
  const [routeCoordinates, setRouteCoordinates] = useState(null);

  const getconnection = async () => {
    const response = await fetch('/dummy_location.json', {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    const data = await response.json();
    const decodedPolyline = polyline.decode(data.trip.legs[0].shape, 6);
    let pointPaths = {};
		decodedPolyline.forEach((point) => {
      pointPaths[`${point[0]};${point[1]}`] = { lat: point[0], lng: point[1] }
		})		    

    setRouteCoordinates(pointPaths)
  }

  useEffect(() => {
    mqttClient.on("connect", function () {
      setIsConnected(true);
      console.log("connected");
    });
    
    mqttClient.subscribe("app-mqtt/subscribe", { qos: 2 }, (error) => {
      if (error) return;
    });  

    mqttClient.on("error", (err) => {
      console.error("Connection error: ", err);
      mqttClient.end();
    });

    mqttClient.on("reconnect", () => {
      console.error("Reconnecting");
    });

    mqttClient.on("message", function (topic, message) {
      const payload = JSON.parse(message);      
      if(payload) {
        setpos([payload.lat, payload.lng]);
        
        if(routeCoordinates) {
          delete routeCoordinates[`${payload.lat};${payload.lng}`];
          setRouteCoordinates(routeCoordinates);
        }                
      }      
    });
  }, [routeCoordinates]);
  
  useEffect(() => {    
    getconnection();
  }, [])

  return (
    <div className="App">
      <MapContainer
        center={center} 
        zoom={13} 
        scrollWheelZoom={false}
        style={{ minHeight: "100vh", minWidth: "100vw" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {pos.length > 0 && <Marker position={pos} /> }

        {routeCoordinates && 
          <Polyline
            positions={Object.values(routeCoordinates).map(coord => [coord.lat, coord.lng])}
            color="blue"
          />
        }        

      </MapContainer>      
    </div>
  );  
}

export default App;
