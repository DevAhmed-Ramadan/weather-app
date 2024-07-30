
import React from 'react';
import { ApiResponse } from '../../Interfaces/PrayerTimesInterface';

interface PrayerTimesCardProps {
    data: ApiResponse | undefined;
}

const PrayerTimesCard: React.FC<PrayerTimesCardProps> = ({ data }) => {
    if (!data || !data.data || !data.data.timings) {
        return <div>No data available</div>;
    }

    const prayerTimes = data.data.timings;
    const filteredArray = Object.entries(prayerTimes).slice(0, 7); // Adjust the slice if needed

    return (
        <div className=' dark:text-white dark:bg-slate-800 flex flex-col bg-white text-[#1E1E1E] h-full rounded-[1rem] px-3 shadow-xl'>
            <h2 className='text-[25px] font-bold mt-1 mb-1'>Prayer Times</h2>
            <div className='mt-2'>
                {filteredArray.map(([prayer, time]) => (
                    <div key={prayer} className='flex justify-between py-1 mb-4 text-xl'>
                        <span>{prayer}</span>
                        <span>{time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrayerTimesCard;
