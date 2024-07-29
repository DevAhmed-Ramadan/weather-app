import { useQuery } from '@tanstack/react-query';
import useGeolocation from '../Hooks/useGeolocation';
import axios from 'axios';
import { useContext } from 'react';
import { SearchContext } from '../Context/SearchContext';

export default function useDaysCard() {

    const context = useContext(SearchContext);

    if (!context) {
        throw new Error('SearchAndTheme must be used within a SearchContextProvider');
    }

    const { searchCountry } = context;

    const cleanApiKey = (key: string): string => {
        return key.replace(/[+;].*$/, '').trim();
    };

    const { latitude, longitude, error1: geoError } = useGeolocation();

    const ApiKey = import.meta.env.VITE_API_KEY;
    const cleanedApiKey = cleanApiKey(ApiKey);

    return useQuery({
        queryKey: ['Days', searchCountry, latitude, longitude],
        queryFn: async () => {
            let query;
            if (searchCountry.length > 2) {
                query = searchCountry;
            } else if (latitude && longitude) {
                query = `${latitude},${longitude}`;
            } else {
                throw new Error("No search criteria available");
            }
            const response = await axios.get(
                `https://api.weatherapi.com/v1/forecast.json`, {
                params: {
                    q: query,
                    key: cleanedApiKey,
                    days: 7
                }
            })
            return response.data
        },
        enabled: !!latitude && !!longitude && !geoError
    })
}
