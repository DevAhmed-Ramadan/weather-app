import axios from 'axios';
import useGeolocation from './useGeolocation';
import { useQuery } from '@tanstack/react-query';
import { WeatherApiResponse } from '../Interfaces/WeatherApiResponse';
import { useContext, useEffect } from 'react';
import { SearchContext } from '../Context/SearchContext';

export default function useWeather() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('SearchAndTheme must be used within a SearchContextProvider');
    }

    const { searchCountry } = context;
    

    const cleanApiKey = (key: string): string => {
        return key.replace(/[+;].*$/, '').trim();
    };

    const ApiKey = import.meta.env.VITE_API_KEY;
    const cleanedApiKey = cleanApiKey(ApiKey);

    const { longitude, latitude, error1 } = useGeolocation();



    const result = useQuery<WeatherApiResponse, Error>({

        queryKey: ['weather',searchCountry, latitude, longitude],
        queryFn: async () => {
            let query;
            if (searchCountry.length > 2) {
                query = searchCountry;
            } else if (latitude && longitude) {
                query = `${latitude},${longitude}`;
            } else {
                throw new Error("No search criteria available");
            }

            const response = await axios.get<WeatherApiResponse>('https://api.weatherapi.com/v1/current.json', {
                params: {
                    q: query,
                    key: cleanedApiKey,
                }
            });
            return response.data;
        },
        enabled: !!(searchCountry || (latitude && longitude))
    });

    return result;
}