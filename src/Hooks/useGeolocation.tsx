import { useState, useEffect } from 'react';

interface GeolocationState {
    latitude: number | null;
    longitude: number | null;
    error1: string | null;  // Note: This is named 'error1'
}

const useGeolocation = () => {
    const [state, setState] = useState<GeolocationState>({
        latitude: null,
        longitude: null,
        error1: null,
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setState(prev => ({ ...prev, error1: 'Geolocation is not supported' }));  // Changed to error1
            return;
        }

        const handleSuccess = (position: GeolocationPosition) => {
            setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error1: null,
            });
        };

        const handleError = (error: GeolocationPositionError) => {
            setState(prev => ({ ...prev, error1: error.message }));  // Changed to error1
        };

        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);

        const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError);

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return state;
};

export default useGeolocation;