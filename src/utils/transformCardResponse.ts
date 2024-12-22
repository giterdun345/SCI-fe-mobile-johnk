import { CardResponse } from "@/api/apiTypes";
import { CardData } from "@/types/CardsTypes";

export function transformCardResponse(card: CardResponse): CardData {
  return {
    set: card.Set,
    number: card.Number,
    name: card.Name,
    type: card.Type,
    aspects: card.Aspects ?? [],
    traits: card.Traits ?? [],
    arenas: card.Arenas ?? [],
    cost: parseInt(card.Cost ?? "0", 10),
    power: parseInt(card.Power ?? "0", 10),
    hp: parseInt(card.HP ?? "0", 10),
    fronttext: card.FrontText ?? "",
    doublesided: card.DoubleSided ?? false,
    rarity: card.Rarity ?? "",
    unique: card.Unique ?? false,
    artist: card.Artist ?? "",
    varianttype: card.VariantType ?? "",
    marketprice: card.MarketPrice ?? "",
    foilprice: card.FoilPrice ?? "",
    frontArt: card.FrontArt ?? "",
    id: `${card.Set || "unknown-set"}-${card.Number || "unknown-number"}`,
  };
}
