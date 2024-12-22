export interface CatalogResponse {
  object: "catalog";
  uri: "https://api.swu-db.com/catalog/hps";
  total_values: number;
  data: string[];
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
