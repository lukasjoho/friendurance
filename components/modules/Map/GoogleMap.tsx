'use client';
import mapStyle from '@/components/modules/Map/mapstyles';
import GoogleMapReact from 'google-map-react';
import { FC } from 'react';
import Marker from './Marker';

interface GoogleMapProps {
  markers: any[];
}

const GoogleMap: FC<GoogleMapProps> = ({ markers }) => {
  const defaultProps = {
    center: {
      lat: 50.8687324,
      lng: 9.5485311,
    },
    zoom: 5.5,
  };

  return (
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
        {markers.map((marker, idx) => {
          if (!marker.startLatLng[0]) {
            return;
          }
          return (
            <Marker
              key={idx}
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
