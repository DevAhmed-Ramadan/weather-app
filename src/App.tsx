import LoadingPageProvider from "./Context/LoadingPageContext";
import { AppContent } from "./Components/AppContent/AppContent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchContextProvider } from "./Context/SearchContext";
import ThemeProvider from "./Context/ThemeContext";
// Separate component for app content

const queryClient = new QueryClient();


function App() {
  return (
    <SearchContextProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <LoadingPageProvider>
            <AppContent />
          </LoadingPageProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </SearchContextProvider>
  );
}

export default App;