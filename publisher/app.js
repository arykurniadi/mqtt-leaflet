const fs = require("fs");
const mqtt = require("mqtt");
const polyline = require('@mapbox/polyline');

const url = "ws://localhost:9010";
const option = {
  keepalive: 60,
  clientId: "emqx_react_" + Math.random().toString(16).substring(2, 8),
  protocolId: "MQTT",
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000, //ms
  connectTimeout: 30 * 1000, //ms
  username: 'user1',
  password: 'nusastyle17',
};

const client = mqtt.connect(url, option);
client.on("connect", function () {
	console.log("connected mqtt");

	fs.readFile("dummy_location.json", "utf8", (err, data) => {
		if (err) {
			console.error("Error reading file:", err);
			return;
		}
	
		try {			
			data = JSON.parse(data);
			const decodedPolyline = polyline.decode(data.trip.legs[0].shape, 6);
			let pointPaths = [];
			decodedPolyline.forEach((point) => {
		  		pointPaths.push({ lat: point[0], lng: point[1] });
			})		    

			const processItem = (item) => {
				client.publish('app-mqtt/subscribe', JSON.stringify(item));	
			}
			
			pointPaths.forEach((item, index) => {
				setTimeout(() => processItem(item, index), index * 100);
			});					
		} catch (e) {
			console.error("Error", e);
		}
	});	
});

client.on('error', (error) => {
  console.error('MQTT client error:', error);
});

client.on('close', () => {
  console.log('Disconnected from MQTT broker');
});