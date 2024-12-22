import React, { useState } from "react";
import { View } from "react-native";

import { useSearchCards } from "@/hooks/useSearchCards";
import { CardData } from "@/types/CardsTypes";
import Dropdown from "@/components/Dropdown";
import SortButtonGroup from "@/components/SortButtonGroup";
import CardList from "./src/components/CardList";
import ContentWrapper from "@/components/ContentWrapperNew";

export default function App() {
  const [selectedHP, setSelectedHP] = useState<string>("");
  const [sortKey, setSortKey] = useState<keyof CardData>('name')
  const { cards, loading, error } = useSearchCards(selectedHP, sortKey);

  return (
    <ContentWrapper>
      <View>
        <Dropdown onSelect={setSelectedHP} />
        <SortButtonGroup setSortKey={setSortKey} loading={loading} error={error} hasCards={cards.length === 0} />
      </View>
      <CardList cardList={cards} />
    </ContentWrapper>
  )
}


