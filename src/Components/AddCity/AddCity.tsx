import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import CityCard from "../CityCard/CityCard";
import { WeatherApiResponse } from "../../Interfaces/WeatherApiResponse";


export default function AddCity() {
    const [addCity, setAddCity] = useState<boolean>(false);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [addedCountries, setAddedCountries] = useState<string[]>([]);

    const toggleAddCity = (): void => {
        setAddCity(!addCity);
        if (addCity) {
            setSelectedCountry(''); // Reset selected country when closing the form
        }
    }

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(event.target.value);
    };

    const addCountry = () => {
        if (selectedCountry && !addedCountries.includes(selectedCountry)) {
            setAddedCountries([...addedCountries, selectedCountry]);
        }
        toggleAddCity();
    }

    let localDataWeather = JSON.parse(localStorage.getItem('weatherDataArray') || '[]');


    return (
        <>
            <div className="flex flex-col gap-3 max-h-[450px] overflow-scroll">
                {addCity ? (
                    <div className=" dark:text-white dark:bg-slate-800 flex rounded-lg gap-6 bg-white text-black justify-center items-center py-[33px]">
                        <select
                            value={selectedCountry}
                            onChange={handleCountryChange}
                            className=" dark:text-white dark:bg-slate-800 select select-bordered w-full max-w-xs bg-slate-100"
                        >
                            <option disabled value="">Select a country to search about</option>
                            <option value="United States">United States</option>
                            <option value="China">China</option>
                            <option value="India">India</option>
                            <option value="Brazil">Brazil</option>
                            <option value="Russia">Russia</option>
                            <option value="Japan">Japan</option>
                            <option value="Germany">Germany</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="France">France</option>
                            <option value="Italy">Italy</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                            <option value="Spain">Spain</option>
                            <option value="Mexico">Mexico</option>
                            <option value="South Korea">South Korea</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Poland">Poland</option>
                            <option value="Egypt">Egypt</option>
                        </select>

                        <button
                            onClick={addCountry}
                            className="btn background-7-Days text-white border-none text-[18px]"
                        >
                            Add
                        </button>
                    </div>
                ) : (
                    <div onClick={toggleAddCity} className="    cursor-pointer flex rounded-lg gap-6 bg-transparent border-black dark:border-white border-dashed border-2 text-black justify-center items-center py-[30px]">
                        <i className="bg-white p-4 text-xl rounded"><FaPlus /></i>
                        <p className=" dark:text-white font-medium">Add city you are interested in</p>
                    </div>
                )}

                {addedCountries.map((country) => (
                    <CityCard key={country} selectedCountry={country} />
                ))}

                <div>
                    {localDataWeather.map((data: WeatherApiResponse) => (
                        <div key={data.location.name} className=" dark:text-white dark:bg-slate-800 px-3 flex rounded-lg gap-6 bg-white shadow text-black justify-between items-center py-[30px] mb-4">
                            <img src={data.current.condition.icon} alt="weather-icon" className="w-[67px]" />
                            <div className="flex flex-col">
                                <p className=" dark:text-white font-medium text-xl">{data.location.name}</p>
                                <p className=" dark:text-white text-[#1D1D1D] font-light text-lg">{data.current.condition.text}</p>
                            </div>
                            <span className=" dark:text-white text-[#1D1D1D] text-6xl font-semibold">{data.current.temp_c}°</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
