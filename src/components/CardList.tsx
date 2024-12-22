// CardList.tsx
import { StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import type { CardData } from "@/types/CardsTypes";

import Card from "./Card";
import { ThemedView } from "./ThemedView";

type CardListProps = {
  cardList: CardData[];
};

export default function CardList({ cardList }: CardListProps) {
  const animatedValue = useSharedValue(0);
  const currentIndex = useSharedValue(0);
  const previousIndex = useSharedValue(0);

  return (
    <ThemedView style={styles.container}>
      {cardList.map((item, index) => (
        <Card
          key={item.id}
          {...item}
          cardIndex={index}
          animatedValue={animatedValue}
          currentIndex={currentIndex}
          previousIndex={previousIndex}
          listLength={cardList.length}
        />
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },
});
