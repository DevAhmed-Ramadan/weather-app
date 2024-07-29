import React, { createContext, useState } from "react";

export interface ThemeContextType {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
    children: React.ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    return (
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }} >
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;