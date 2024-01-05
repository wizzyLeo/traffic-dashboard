"use client";
import React, {Component} from "react";
import GoogleMapReact from 'google-map-react';
import Map from "./Map";



export default function MapSection(){
  const defaultProps = {
    center: {
      lat: 24.80361,
      lng: 120.96861
    },
    zoom: 15
  };

  return (
    // Important! Always set the container height explicitly
    <div className="w-full aspect-[16/10] overflow-hidden rounded-3xl">
      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: `AIzaSyBGFyvqp623RCbrcPXoF43O_nFt3XHPeM0` }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >

      </GoogleMapReact> */}
      <Map/>
    </div>
  );
}