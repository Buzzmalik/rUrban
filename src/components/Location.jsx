

import { useState, useRef } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

// eslint-disable-next-line react/prop-types
function Location({ onSelectLocation = console.log, lat = 0, lng = 0 }) {
const [center, setCenter] = useState({ lat: 5.7061869, lng: -0.3019511 });

const autocompleteRef = useRef(null);

const handleMapClick = (event) => {
    setCenter({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });

    let address = '';

    // Reverse geocoding to get location in words
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: center }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const formattedAddress = results[0].formatted_address;
          address = formattedAddress;
          // console.log("I got the address", address);
          onSelectLocation({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            address: address, // Replace with actual location
          });
        }
      }
    });


    
  };

const onPlaceSelected = () => {
    const place = autocompleteRef.current.getPlace();

    if (place.geometry) {
    const selectedAddress = place.formatted_address;
    setCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
    });

    onSelectLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: selectedAddress,
    });
    }
};

const libraries = ['places'];

const { isLoaded } = useJsApiLoader({
  id: 'google-map-script',
  googleMapsApiKey: 'AIzaSyBREjZAMtf-utlBXK1GTVkDdNNzYS3ZAiw',
  libraries: libraries,
});

if(isLoaded)
return (
    <>
      <GoogleMap
          mapContainerStyle={{ width: '100%', height: '400px' }}
          center={center}
          zoom={18}
          onClick={handleMapClick}
      >
          <MarkerF
              position={{ lat: center.lat, lng: center.lng }}
          />
      </GoogleMap>
    </>
);
else return "Loading..."
}

export default Location;