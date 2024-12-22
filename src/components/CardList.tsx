// CardList.tsx
import {
  View,
  StyleSheet,
} from "react-native";

import type { CardData } from "@/types/CardsTypes";
import Card from "./Card";

type CardListProps = {
  cardList: CardData[];
};

export default function CardList({ cardList }: CardListProps) {
  console.log("list 0", cardList[0])
  return (
    <View style={styles.container}>
      {cardList.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#111827",
  }
});
