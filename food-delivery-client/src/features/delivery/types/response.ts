export type ReverseGeocodingAddress = {
  formatted: string;
  lat: number;
  lon: number;
};

export type ReverseGeocodingResponseDto = {
  results: ReverseGeocodingAddress[];
};
