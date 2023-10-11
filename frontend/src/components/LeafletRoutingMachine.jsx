import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

const LeafletRoutingMachine = () => {
  const map = useMap();
  useEffect(() => {
    // var marker1 = L.marker([-6.1787782220076775, 106.69950637068156], { icon: DefaultIcon }).addTo(map);
    var marker1 = L.marker([-6.1787782220076775, 106.69950637068156]).addTo(map);

    L.marker([-6.127985, 106.613733]).addTo(map);

    L.Routing.control({
      waypoints: [
        L.latLng(-6.1787782220076775, 106.69950637068156),
        L.latLng([-6.127985, 106.613733]),
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
      routeWhileDragging: true,
      geocoder: L.Control.Geocoder.nominatim(),
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    })
    .on("routesfound", function (e) {

    })


    // L.Routing.control({
    //   waypoints: [
    //     L.latLng(-6.1787782220076775, 106.69950637068156),
    //     L.latLng(-6.127985, 106.613733),
    //   ],
    //   lineOptions: {
    //     styles: [
    //       {
    //         color: "blue",
    //         weight: 4,
    //         opacity: 0.7,
    //       },
    //     ],
    //   },
    //   routeWhileDragging: true,
    //   // geocoder: L.Control.Geocoder.nominatim(),
    //   addWaypoints: false,
    //   draggableWaypoints: false,
    //   fitSelectedRoutes: true,
    //   showAlternatives: false,
    // })

  }, []);
  return null;
};

export default LeafletRoutingMachine;
