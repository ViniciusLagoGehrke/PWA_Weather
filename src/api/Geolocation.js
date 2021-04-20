import { useState, useEffect } from 'react';

export const useCurrentLocation = (options = {}) => {
  const [location, setLocation] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    // If the geolocation is not defined in the used browser you can handle it as an error
    if (!navigator.geolocation) {
      setError('Geolocation is not supported.');
      return;
    }

    const handleSuccess = position => {
      const { latitude, longitude } = position.coords;

      setLocation({
        latitude,
        longitude
      });
    };

    const handleError = error => {
      setError(error.message);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);

  }, [options]);

  return { location, error };
};