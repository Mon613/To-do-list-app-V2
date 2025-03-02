import React, { useEffect, useState } from 'react';

interface Location {
  latitude: number | null;
  longitude: number | null;
}
const DEFAULT_LOCATION: Location={
  latitude:21.0285,
  longitude: 105.8542,
}
const UserLocation = () => {
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err: GeolocationPositionError) => {
          setError(err.message);
          setLocation(DEFAULT_LOCATION);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setError('Trình duyệt không hỗ trợ Geolocation API');
      setLocation(DEFAULT_LOCATION);
    }
  }, []);
  return location;
};

export default UserLocation;
