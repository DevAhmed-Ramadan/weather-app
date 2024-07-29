import React from 'react';

function getNextSevenDays(): string[] {
    const today = new Date();
    const nextSevenDays: string[] = [];

    for (let i = 1; i <= 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const isTomorrow = i === 1;

        const formatter = new Intl.DateTimeFormat('en-GB', {
            weekday: 'long',
            day: '2-digit',
            month: 'short',
        });

        const parts = formatter.formatToParts(date);
        const weekday = parts.find(part => part.type === 'weekday')?.value || '';
        const day = parts.find(part => part.type === 'day')?.value || '';
        const month = parts.find(part => part.type === 'month')?.value || '';

        let formattedDate = `${weekday}, ${day} ${month}`;

        if (isTomorrow) {
            formattedDate = `Tomorrow, ${day} ${month}`;
        }

        nextSevenDays.push(formattedDate);
    }

    return nextSevenDays;
}

interface DaysCardProps {
    data: any;
}

const DaysCard: React.FC<DaysCardProps> = ({ data }) => {
    const get7days = getNextSevenDays();
    const tomorrow = get7days[0];
    const reorderedDays = [...get7days.slice(1), tomorrow];

    if (!data || !data.forecast || !data.forecast.forecastday) return null;

    return (
        <div className=" dark:text-white dark:bg-slate-800 flex flex-col bg-white text-[#1E1E1E] h-full rounded-[1rem] px-3 shadow-xl">
            <h2 className='text-[25px]  font-bold mt-1 '>Next 7 Days</h2>

            {reorderedDays.map((day, index) => (
                <div
                    key={index}
                    className={`dark:text-white flex items-center px-2 ${day.startsWith('Tomorrow') ? 'background-7-Days rounded-md text-white' : ''} py-[3px]`}
                >
                    <p className={` dark:text-white flex-1 ${day.startsWith('Tomorrow') ? 'font-bold' : 'text-black'}`}>
                        {day}
                    </p>
                    <div className="w-[50px] flex justify-center items-center ms-5">
                        <img
                            src={data.forecast.forecastday[index]?.day?.condition.icon}
                            className="w-[50px]"
                            alt="icon"
                        />
                    </div>
                    <p className={`dark:text-white flex-1 text-right ${day.startsWith('Tomorrow') ? 'text-white' : 'text-black'}`}>
                        {data.forecast.forecastday[index]?.day?.avgtemp_c}°C
                    </p>
                </div>
            ))}
        </div>
    );
}

export default DaysCard;
