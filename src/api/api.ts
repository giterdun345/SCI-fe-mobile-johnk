// api.ts
import { Platform } from "react-native";
import axios from "axios";
import type { CatalogResponse, CardResponse } from "./apiTypes";

const BASE_URL =
  Platform.OS === "android"
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

interface APIResponse<T> {
  data: T;
  status?: number;
  message?: string;
}

export const fetchCatalog = async (): Promise<CatalogResponse> => {
  try {
    const response = await axios.get<CatalogResponse>(
      `${BASE_URL}/catalog/hps`
    );

    const catalogOptions = response.data.data; // TODO: may want to adjust name

    return {
      ...response.data,
      data: catalogOptions.filter((option: string) => !option.includes("+")),
    };
  } catch (error) {
    console.error("error", error);
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
