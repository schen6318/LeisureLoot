import React, { useEffect, useRef } from "react";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";

const CenterRedCirclePinpoint = () => (
  <div
    style={{
      color: "white",
      background: "red",
      padding: "10px 10px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)",
    }}
  >
    {"Location"}
  </div>
);
function Deleter() {
  const mapRef = useRef();
  useEffect(() => {
    try {
      mapRef.current.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.removeAttribute(
        "aria-roledescription"
      );
    } catch (er) {
      console.log("deleter failed, maybe the map wasn't ready?", er);
    }
  }, []);

  return <div ref={mapRef}></div>;
}

function Map(props) {
  let defaultProps = {
    center: {
      lat: props.latitude,
      lng: props.longitude,
    },
    zoom: 11,
  };

  return (
    <div className={"map"}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <CenterRedCirclePinpoint lat={props.latitude} lng={props.longitude} />
        <Deleter></Deleter>
      </GoogleMapReact>
    </div>
  );
}

Map.propTypes = {
  longitude: PropTypes.number,
  latitude: PropTypes.number,
};
export default Map;