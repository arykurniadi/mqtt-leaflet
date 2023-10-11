import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const CurrentMarkerComponent = (props) => {
	const { currentLocation } = props;

	const map = useMap();

  useEffect(() => {
		if(currentLocation) {
			const position = [currentLocation.lat, currentLocation.lng];
			
			let DefaultIcon = L.icon({
				iconUrl: "/marker-icon.png",
				iconSize: [25, 41],
				iconAnchor: [10, 41],
				popupAnchor: [2, -40],
			});
		
			const marker = L.marker(position, { icon: DefaultIcon }).addTo(map);
			map.setView(position, 13);
		
			console.log('--> position', position)
			marker.setLatLng(position);		
		}		
	});
};

export default CurrentMarkerComponent;
