// CardList.tsx
import { useRef } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

import type { CardData } from "@/types/CardsTypes";

import Card from "./Card";
import { ThemedView } from "./ThemedView";

type CardListProps = {
  cardList: CardData[];
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function CardList({ cardList }: CardListProps) {
  const ref = useRef<ICarouselInstance>(null);

  return (
    <ThemedView style={styles.container}>
      <Carousel
        ref={ref}
        width={screenWidth}
        height={screenHeight * 0.75}
        data={cardList}
        loop
        pagingEnabled
        snapEnabled
        renderItem={({ item }) => <Card {...item} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
