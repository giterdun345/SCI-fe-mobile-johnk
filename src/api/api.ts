// api.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";

import type { CatalogResponse, CardResponse } from "./apiTypes";

const BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:8010/proxy"
    : "http://localhost:8010/proxy";

export class APIError extends Error {
  constructor(
    message: string,
    public originalError?: unknown,
  ) {
    super(message);
    this.name = "APIError";
  }
}

export const fetchCatalog = async (): Promise<CatalogResponse> => {
  const storageKey = `catalog-options`;
  const cache: CatalogResponse | null = await getCachedData(storageKey);
  if (cache !== null) return cache;

  try {
    const response = await axios.get<CatalogResponse>(
      `${BASE_URL}/catalog/hps`,
    );

    const catalogOptions = response.data.data; // TODO: may want to adjust name

    const formattedCatalogOptions = {
      ...response.data,
      data: catalogOptions.filter((option: string) => !option.includes("+")),
    };

    await AsyncStorage.setItem(
      storageKey,
      JSON.stringify(formattedCatalogOptions),
    );
    return formattedCatalogOptions;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new APIError(
        `Failed to fetch catalog data: ${error.message}`,
        error,
      );
    }

    throw new APIError("Failed to fetch catalog data");
  }
};

export const searchCards = async (
  hp: string,
): Promise<CardResponse["data"]> => {
  // typing differs from CatalogResponse, keys are   ["total_cards", "data"]
  const storageKey = `card-list-${hp}`;
  const cache: CardResponse | null = await getCachedData(storageKey);
  if (cache !== null) return cache.data;

  try {
    const response = await axios.get<CardResponse>(`${BASE_URL}/cards/search`, {
      params: {
        q: `h=${hp}`,
        pretty: true,
      },
    });

    const responseData = response.data;
    await AsyncStorage.setItem(storageKey, JSON.stringify(responseData));
    return responseData.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new APIError(`Failed to fetch card data: ${error.message}`, error);
    }
    throw new APIError("Failed to fetch card data");
  }
};

async function getCachedData(storageKey: string) {
  try {
    const storageData = await AsyncStorage.getItem(storageKey);
    return storageData != null ? JSON.parse(storageData) : null;
  } catch (error) {
    console.error(error); // needs better error handling
    return null;
  }
}
