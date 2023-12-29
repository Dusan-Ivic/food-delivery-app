export type ReverseGeocodingRequestParams = {
  apiKey?: string;
  lat?: number;
  lon?: number;
  limit?: number;
  type?: "country" | "state" | "city" | "postcode" | "street" | "amenity";
  lang?: string;
  format?: "json" | "xml" | "geojson";
};
