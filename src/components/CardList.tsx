// CardList.tsx
import {
  StyleSheet,
} from "react-native";
// import {Ges}

import type { CardData } from "@/types/CardsTypes";
import Card from "./Card";
import { ThemedView } from "./ThemedView";

type CardListProps = {
  cardList: CardData[];
};

export default function CardList({ cardList }: CardListProps) {

  return (
    <ThemedView style={styles.container}>
      {cardList?.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 16,
    // backgroundColor: "#111827",
  }
});
