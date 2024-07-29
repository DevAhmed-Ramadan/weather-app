import { CiLocationOn } from "react-icons/ci";
import { FaWind, FaEye } from "react-icons/fa";
import { MdOutlineWaterDrop } from "react-icons/md";
import { WeatherApiResponse } from '../../Interfaces/WeatherApiResponse';

interface WeatherCardProps {
    data?: WeatherApiResponse;  // Allow undefined
}

function formatDate(date: Date): string {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    const formatter = new Intl.DateTimeFormat('en-GB', {
        weekday: isToday ? undefined : 'long',
        day: '2-digit',
        month: 'short',
        year: '2-digit'
    });

    const parts = formatter.formatToParts(date);
    const formattedDate = parts.map(part => part.value).join(' ').trim();

    return isToday ? `today, ${formattedDate}` : formattedDate;
}

// Usage
const currentDate = new Date();

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
    if (!data) {
        return <div>Loading...</div>;  // or any fallback UI
    }

    return (
        <div className="card weather_gradient text-white shadow-xl">
            <div className="flex justify-between items-center">
                <div>
                    <p className='ms-6 mt-5 text-lg'>{formatDate(currentDate)}</p>
                    <p className='ms-6 text-base flex items-center gap-1'>
                        <CiLocationOn className='inline' /> <span>{data.location.name}</span>
                    </p>
                </div>
                <p className='me-6 text-lg'>{data.current.condition.text}</p>
            </div>

            <div className='relative flex flex-col items-center'>
                {data.current.condition.icon && (
                    <img
                        className='w-[290px] z-10 mt-5'
                        src={data.current.condition.icon}
                        alt="weather icon"
                    />
                )}
                <p className='absolute text-[84px] font-medium bg-clip-text text-transparent bg-gradient-to-b from-white to-transparent z-[5]'>
                    {data.current.temp_c}°
                </p>
            </div>

            <div className='flex justify-between items-center pb-8'>
                <div className='w-[100px] flex flex-col items-center justify-center wind relative'>
                    <FaWind className='text-[33px] mb-1' />
                    <span>{data.current.wind_kph} km/h</span>
                    <span>Wind</span>
                </div>
                <div className='w-[100px] flex flex-col items-center justify-center humidity relative'>
                    <MdOutlineWaterDrop className='text-[33px] mb-1' />
                    <span>{data.current.humidity}%</span>
                    <span>Humidity</span>
                </div>
                <div className='w-[100px] flex flex-col items-center justify-center'>
                    <FaEye className='text-[33px] mb-1' />
                    <span>{data.current.vis_km} km</span>
                    <span>Visibility</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
