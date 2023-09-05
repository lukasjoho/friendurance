"use client";
import React from "react";
import GoogleMapReact from "google-map-react";
import mapStyle from "@/lib/mapstyles";
import Container from "../Container";

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

export default function GoogleMap() {
  const defaultProps = {
    center: {
      lat: 50.8687324,
      lng: 5.2485311,
    },
    zoom: 5.5,
  };

  return (
    // Important! Always set the container height explicitly
    <Container>
      <div className="aspect-[2/1]">
        <GoogleMapReact
          options={{
            styles: mapStyle,
            fullscreenControl: false,
            zoomControl: false,
          }}
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    </Container>
  );
}
