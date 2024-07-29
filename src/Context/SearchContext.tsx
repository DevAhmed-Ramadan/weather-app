import React, { createContext, useState } from "react";

type SearchContextType = {
    searchCountry: string;
    setSearchCountry: (value: string) => void;
};

export const SearchContext = createContext<SearchContextType | null>(null);

interface SearchContextProviderProps {
    children: React.ReactNode;
}

export const SearchContextProvider: React.FC<SearchContextProviderProps> = ({ children }) => {
    const [searchCountry, setSearchCountry] = useState<string>('');

    return (
        <SearchContext.Provider value={{ searchCountry, setSearchCountry }}>
            {children}
        </SearchContext.Provider>
    );
};