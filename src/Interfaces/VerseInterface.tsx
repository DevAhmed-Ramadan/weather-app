export interface VerseData {
    text: string;
    data: {
        number: number;
        text: string;
        edition: {
            identifier: string;
            language: string;
            name: string;
            englishName: string;
            format: string;
            type: string;
            direction: string;
        };
    };
}