import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { VerseData } from '../Interfaces/VerseInterface'

function getRandomVerseNumber(): number {
    return Math.floor(Math.random() * 6236) + 1;
}

export default function useVerse() {
    return useQuery<VerseData, Error>({
        queryKey: ['Verse'],
        queryFn: async () => {
            const response = await axios.get<{ data: VerseData }>(`https://api.alquran.cloud/v1/ayah/${getRandomVerseNumber()}`)
            if (response.data && response.data.data) {
                return response.data.data;
            }
            throw new Error('No verse data found in the response');
        },
        retry: 2, // Retry failed requests up to 2 times
        staleTime: 24 * 60 * 60 * 1000, // Consider data fresh for 24 hours
    })
}