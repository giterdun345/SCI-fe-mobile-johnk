// api.ts
import { Platform } from "react-native";
import axios from "axios";

const BASE_URL =
  Platform.OS !== "web"
    ? "http://10.0.2.2:8010/proxy"
    : "http://localhost:8010/proxy";

export class APIError extends Error {
  constructor(
    message: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = "APIError";
  }
}

export interface CardResponse {
  Set: string;
  Number: string;
  Name: string;
  Type: string;
  Aspects?: string[];
  Traits?: string[];
  Arenas?: string[];
  Cost: string;
  Power: string;
  HP: string;
  FrontText?: string;
  DoubleSided?: boolean;
  Rarity?: string;
  Unique?: boolean;
  Artist?: string;
  VariantType?: string;
  MarketPrice?: string;
  FoilPrice?: string;
  FrontArt?: string;
}

export interface APIResponse<T> {
  data: T;
  status?: number;
  message?: string;
}

export const fetchCatalog = async (): Promise<APIResponse<string[]>> => {
  console.log("BASE URL", BASE_URL);
  try {
    const response = await axios.get<APIResponse<string[]>>(
      `${BASE_URL}/catalog/hps`
    );
    return {
      // TODO: figure out what data is required, do we only need data?
      ...response.data,
      data: response.data.data.filter(
        (option: string) => !option.includes("+")
      ),
    };
  } catch (error) {
    console.log("error", error);
    if (axios.isAxiosError(error)) {
      throw new APIError(
        `Failed to fetch catalog data: ${error.message}`,
        error
      );
    }
    throw new APIError("Failed to fetch catalog data");
  }
};

export const searchCards = async (
  hp: string
): Promise<APIResponse<CardResponse[]>> => {
  try {
    const response = await axios.get<APIResponse<CardResponse[]>>(
      `${BASE_URL}/cards/search`,
      {
        params: {
          q: `h=${hp}`,
          pretty: true,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new APIError(`Failed to fetch card data: ${error.message}`, error);
    }
    throw new APIError("Failed to fetch card data");
  }
};
