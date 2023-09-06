"use client";
import React, { FC } from "react";
import GoogleMapReact from "google-map-react";
import mapStyle from "@/lib/mapstyles";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Marker = ({ data }: any) => (
  <div className="aspect-square rounded-full bg-brand w-6 h-6 flex justify-center items-center">
    <Avatar className="w-5 h-5">
      <AvatarImage src={data?.user?.imageUrl ?? undefined} />
      <AvatarFallback>
        {data?.user?.firstName?.charAt(0) +
          "" +
          data?.user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  </div>
);

interface GoogleMapProps {
  markers: any[];
}

const GoogleMap: FC<GoogleMapProps> = ({ markers }) => {
  const defaultProps = {
    center: {
      lat: 50.8687324,
      lng: 5.2485311,
    },
    zoom: 5.5,
  };

  return (
    // Important! Always set the container height explicitly
    <div className="aspect-[4/5] md:aspect-[2/1]">
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
        {markers.map((marker) => {
          if (!marker.startLatLng[0]) {
            return;
          }
          return (
            <Marker
              lat={marker.startLatLng[0]}
              lng={marker.startLatLng[1]}
              data={marker}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
