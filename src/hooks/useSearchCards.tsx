import { useEffect, useState } from "react";

import { searchCards } from "@/api/api";
import type { UnformattedCard } from "@/api/apiTypes";
import type { CardData } from "@/types/CardsTypes";

export function useSearchCards(hp = "0", sortKey: undefined | keyof CardData) {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCardData = async () => {
      if (!hp) {
        setCards([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await searchCards(hp);
        const formattedCards = result?.map(transformCardResponse);

        setCards(formattedCards || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load cards");
      } finally {
        setLoading(false);
      }
    };

    void fetchCardData();
  }, [hp]);

  useEffect(() => {
    if (!sortKey) return;

    setCards((prevCardList) =>
      prevCardList.sort((a, b) =>
        a[sortKey] < b[sortKey] ? -1 : a[sortKey] > b[sortKey] ? 1 : 0,
      ),
    );
  }, [sortKey]);

  return { loading, error, cards };
}

function transformCardResponse(card: UnformattedCard): CardData {
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
