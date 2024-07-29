import { useContext, useEffect, useState } from "react";
import { loadingPageContext } from "./../../Context/LoadingPageContext";
import LoaderPage from "../LoaderPage/LoaderPage";
import WeatherCard from "../WeatherCard/WeatherCard";
import DaysCard from "../DaysCard/DaysCard";
import PrayerTimesCard from "../PrayerTimesCard/PrayerTimesCard";
import { usePrayerTimes } from "../../Hooks/usePrayerTimes";
import useWeather from "../../Hooks/useWeather";
import useDaysCard from "../../Interfaces/useDaysCard";
import VerseCard from "../VerseCard/VerseCard";
import AddCity from "../AddCity/AddCity";
import SearchAndTheme from "../SearchAndTheme/SearchAndTheme";
import { ThemeContext } from "../../Context/ThemeContext";

export const AppContent = () => {

    const themeCTX = useContext(ThemeContext);

    if (!themeCTX) {
        throw new Error("ThemeContext must be used within a ThemeProvider");
    }
    const { isDarkMode } = themeCTX

    const htmlTag = document.getElementsByTagName('html')[0]
    

    htmlTag.className = isDarkMode ? 'dark' : 'light'


    const LoadingContext = useContext(loadingPageContext);
    const [isDataReady, setIsDataReady] = useState(false);

    const { data: prayerData, isLoading: prayerLoading } = usePrayerTimes();
    const { data: weatherData, isLoading: weatherLoading } = useWeather();
    const { data: WeatherDaysData, isLoading: daysLoading } = useDaysCard();

    useEffect(() => {

        if (!prayerLoading && !weatherLoading && !daysLoading && prayerData && weatherData && WeatherDaysData) {
            setTimeout(() => {
                setIsDataReady(true);
            }, 2000)

            if (LoadingContext) {
                LoadingContext.setLoadingPage(false);
            }
        }
    }, [prayerData, weatherData, WeatherDaysData, prayerLoading, weatherLoading, daysLoading]);

    if (!LoadingContext) {
        console.error("LoadingContext is not defined");
        return null;
    }

    const { loadingPage } = LoadingContext;


    if (loadingPage || !isDataReady) {
        return <LoaderPage />;
    }

    return (
        <div className='min-h-screen bg-lightColor dark:bg-slate-900 overflow-auto'>
            <div className="container mt-4">
                <div className='grid grid-cols-1 md:grid-cols-3 grid-rows-[repeat(13,1fr)] gap-5'>
                    <div className='col-span-3 md:col-span-1 md:col-start-1 md:row-start-1 md:row-span-9'>
                        {weatherData && <WeatherCard data={weatherData} />}
                    </div>
                    <div className='col-start-2 col-span-2 row-start-1'>
                        <SearchAndTheme />
                    </div>
                    <div className='md:col-start-2 md:row-start-2 md:row-span-6 md:col-span-1 col-span-3'>
                        {WeatherDaysData && <DaysCard data={WeatherDaysData} />}
                    </div>
                    <div className='md:col-start-3 md:row-start-2 md:row-span-6 md:col-span-1 col-span-3'>
                        {prayerData && <PrayerTimesCard data={prayerData} />}
                    </div>
                    <div className='col-start-1 row-start-8 row-span-7'>
                        <AddCity />
                    </div>
                    <div className='col-start-2 col-span-2 row-start-8 row-span-6'>
                        <VerseCard />
                    </div>
                </div>
            </div>
        </div>
    );
};
