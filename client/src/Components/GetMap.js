import React, { useEffect, useRef } from "react";
import { LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const mapId = "your-map-id";

const GetMap = ({ center }) => {
  const mapRef = useRef(null);
  useEffect(() => {
    const initMap = async () => {
      if (window.google && center) {
        // Ensure center is defined
        // Request needed libraries
        const { Map } = await window.google.maps.importLibrary("maps");
        const { AdvancedMarkerElement } =
          await window.google.maps.importLibrary("marker");

        const map = new Map(mapRef.current, {
          center, // Use the center prop
          zoom: 14,
          mapId: mapId,
        });

        new AdvancedMarkerElement({
          map: map,
          position: center, // Use the center prop
        });
      }
    };

    initMap();
  }, [center]); // Re-run when center changes

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div ref={mapRef} style={containerStyle} />
    </LoadScript>
  );
};

export default GetMap;
