import axios from 'axios';
import { ApiResponse } from '../Interfaces/PrayerTimesInterface';
import { useQuery } from '@tanstack/react-query';
import useGeolocation from './useGeolocation';
import { useContext } from 'react';
import { SearchContext } from '../Context/SearchContext';

interface PrayerTimesHookResult {
    data: ApiResponse | undefined;
    isLoading: boolean;
    error: Error | null;
}

export function usePrayerTimes(): PrayerTimesHookResult {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('SearchAndTheme must be used within a SearchContextProvider');
    }

    const { searchCountry } = context;
    const { longitude, latitude } = useGeolocation();

    const result = useQuery<ApiResponse, Error>({
        queryKey: ['prayer', searchCountry, latitude, longitude],
        queryFn: async () => {
            const timestamp = Math.floor(Date.now() / 1000);
            
            if (searchCountry.length > 2) {
                const response = await axios.get<ApiResponse>(`http://api.aladhan.com/v1/timingsByAddress/${timestamp}`, {
                    params: {
                        address: searchCountry,
                        method: 2
                    }
                });
                return response.data;
            } else if (latitude && longitude) {
                const response = await axios.get<ApiResponse>(`http://api.aladhan.com/v1/timings/${timestamp}`, {
                    params: {
                        latitude,
                        longitude,
                        method: 2
                    }
                });
                return response.data;
            } else {
                throw new Error("No search criteria available");
            }
        },
        enabled: !!(searchCountry.length > 2 || (latitude && longitude)),
    });

    return {
        data: result.data,
        isLoading: result.isLoading,
        error: result.error,
    };
}