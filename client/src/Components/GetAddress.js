import React, { useEffect, useState } from "react";

const GEOCODING_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";
const API_KEY = process.env.REACT_APP_GEOCODING_API_KEY;

const GetAddress = ({ address, onCoordinatesFetched }) => {
  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!address) return;

      const url = `${GEOCODING_API_URL}?address=${encodeURIComponent(
        address
      )}&key=${API_KEY}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === "OK") {
          const { lat, lng } = data.results[0].geometry.location;
          onCoordinatesFetched({ lat, lng });
        } else {
          console.error("Geocoding failed:", data.status);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, [address, onCoordinatesFetched]);

  return null;
};

export default GetAddress;
