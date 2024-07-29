import { WeatherApiResponse } from '../../Interfaces/WeatherApiResponse';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

interface CityCardProps {
    selectedCountry: string;
}

const CityCard: React.FC<CityCardProps> = ({ selectedCountry }) => {
    const [weatherDataArray, setWeatherDataArray] = useState<WeatherApiResponse[]>([]);

    const cleanApiKey = (key: string): string => {
        return key.replace(/[+;].*$/, '').trim();
    };

    const ApiKey = import.meta.env.VITE_API_KEY;
    const cleanedApiKey = cleanApiKey(ApiKey);

    const getStoredWeatherData = (): WeatherApiResponse[] => {
        const storedData = localStorage.getItem('weatherDataArray');
        return storedData ? JSON.parse(storedData) : [];
    };

    useEffect(() => {
        setWeatherDataArray(getStoredWeatherData());
    }, []);

    const { data, error, isLoading } = useQuery<WeatherApiResponse, Error>({
        queryKey: ['weatherCity', selectedCountry],
        queryFn: async () => {
            if (!selectedCountry) {
                throw new Error("No country selected");
            }

            const response = await axios.get<WeatherApiResponse>('https://api.weatherapi.com/v1/current.json', {
                params: {
                    q: selectedCountry,
                    key: cleanedApiKey,
                }
            });

            const updatedWeatherDataArray = updateWeatherDataArray(response.data);
            setWeatherDataArray(updatedWeatherDataArray);

            return response.data;
        },
        enabled: !!selectedCountry,
    });

    const updateWeatherDataArray = (newData: WeatherApiResponse): WeatherApiResponse[] => {
        const existingIndex = weatherDataArray.findIndex(item => item.location.name === newData.location.name);
        let updatedArray;

        if (existingIndex !== -1) {
            updatedArray = [
                ...weatherDataArray.slice(0, existingIndex),
                newData,
                ...weatherDataArray.slice(existingIndex + 1)
            ];
        } else {
            updatedArray = [...weatherDataArray, newData];
        }

        localStorage.setItem('weatherDataArray', JSON.stringify(updatedArray));
        return updatedArray;
    };

    if (error) return <div>Error: {error.message}</div>;
    if (isLoading) return <div>Loading...</div>;

    const renderWeatherCard = (data: WeatherApiResponse) => (
        <div className="px-3 flex rounded-lg gap-6 bg-white shadow text-black justify-between items-center py-[30px] mb-4">
            <img src={data.current.condition.icon} alt="weather-icon" className="w-[67px]" />
            <div className="flex flex-col">
                <p className="font-medium text-xl">{data.location.name}</p>
                <p className="text-[#1D1D1D] font-light text-lg">{data.current.condition.text}</p>
            </div>
            <span className="text-[#1D1D1D] text-6xl font-semibold">{data.current.temp_c}°</span>
        </div>
    );

    return (
        <>
            {data && renderWeatherCard(data)}
            {weatherDataArray.map((item) => (
                item.location.name !== data?.location.name && renderWeatherCard(item)
            ))}
        </>
    );
};

export default CityCard;