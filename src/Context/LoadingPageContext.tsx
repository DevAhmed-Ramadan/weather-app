import { createContext, useState } from "react";

export interface LoadingPageType {
    loadingPage: boolean,
    setLoadingPage: React.Dispatch<React.SetStateAction<boolean>>
}

export const loadingPageContext = createContext<LoadingPageType|null>(null);

interface LoadingPageProviderProps {
    children : React.ReactNode
}

const LoadingPageProvider:React.FC<LoadingPageProviderProps> = ({children}) => {

    const [loadingPage, setLoadingPage] = useState<boolean>(true)

    return (
        <loadingPageContext.Provider value={{loadingPage , setLoadingPage}}>
            {children}
        </loadingPageContext.Provider>
    )
}

export default LoadingPageProvider
