import { useContext } from 'react'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'
import { SearchContext } from '../../Context/SearchContext';
import { ThemeContext } from '../../Context/ThemeContext';

export default function SearchAndTheme() {

    const themeCTX = useContext(ThemeContext)

    if (!themeCTX) {
        throw new Error("ThemeContext must be used within a ThemeProvider");
    }
    const { isDarkMode } = themeCTX

    const htmlTag = document.getElementsByTagName('html')[0]

    htmlTag.className = isDarkMode ? 'dark' : 'light'

    const context = useContext(SearchContext);

    if (!context) {
        throw new Error('SearchAndTheme must be used within a SearchContextProvider');
    }

    const { searchCountry, setSearchCountry } = context;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCountry(event.target.value)
    }


    return (
        <div className='flex items-center justify-between gap-4'>
            <input
                type="text"
                placeholder="Search for city"
                className="input input-bordered grow bg-white placeholder:text-[16px] text-black text-[19px]"
                value={searchCountry}
                onChange={handleInputChange}
            />

            <ToggleSwitch />


            <div className='indicator cursor-pointer'>
                {!isDarkMode ? (
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-7 w-7'
                        viewBox='0 0 24 24'
                    >
                        <path
                            stroke='black'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            fill='none'
                            d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-7 w-7'
                        viewBox='0 0 24 24'
                    >
                        <path
                            stroke='white'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            fill='none'
                            d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                        />
                    </svg>
                )}
                <div className="badge badge-primary badge-xs"></div>
            </div>
        </div>
    )
}