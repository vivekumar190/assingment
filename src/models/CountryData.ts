export interface CountryData {
    country: string;
    countryInfo: {
        lat: number;
        long: number;
        flag: string;
    };
    cases: number;
    deaths: number;
    recovered: number;
    active: number;
}
