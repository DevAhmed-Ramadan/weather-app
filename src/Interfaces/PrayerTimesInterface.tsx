interface PrayerTimes {
    Asr: string;
    Dhuhr: string;
    Fajr: string;
    Firstthird: string;
    Imsak: string;
    Isha: string;
    Lastthird: string;
    Maghrib: string;
    Midnight: string;
    Sunrise: string;
    Sunset: string;
}

// Define the API response interface
export interface ApiResponse {
    data: {
        timings: PrayerTimes;
        // Add other properties if needed
    };
}