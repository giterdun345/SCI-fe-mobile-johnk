import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

import ContentWrapper from "@/components/ContentWrapperNew";
import Dropdown from "@/components/Dropdown";
import SortButtonGroup from "@/components/SortButtonGroup";
import { useSearchCards } from "@/hooks/useSearchCards";
import { CardData } from "@/types/CardsTypes";

import CardList from "./src/components/CardList";

/* This is the default configuration with strict 
/*   mode disabled for  Warning: Reading from `value` 
/* during component render. 
*/
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

export default function App() {
  const [selectedHP, setSelectedHP] = useState<string>("");
  const [sortKey, setSortKey] = useState<keyof CardData>("name");
  const { cards, loading, error } = useSearchCards(selectedHP, sortKey);

  return (
    <GestureHandlerRootView>
      <ContentWrapper>
        <Dropdown onSelect={setSelectedHP} />
        <SortButtonGroup
          sortKey={sortKey}
          setSortKey={setSortKey}
          loading={loading}
          error={error}
          hasCards={cards?.length === 0}
        />
        <CardList cardList={cards} />
      </ContentWrapper>
    </GestureHandlerRootView>
  );
}
