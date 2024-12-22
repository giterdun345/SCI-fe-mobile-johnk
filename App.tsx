import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Platform, Image } from "react-native";

import { CardData } from "@/types/CardsTypes";

import CardList from "./src/components/CardList";
import ParallaxScrollView from "./src/components/ParallaxScrollView";
import StickyHeaderMain from "./src/components/StickyHeader/StickyHeaderMain";

export default function App() {
  const [cardList, setCardList] = useState<CardData[]>([]);

  const HeaderImage = () => (
    <Image
      style={{ height: "100%", width: "100%" }}
      source={{
        uri: "https://playingcarddecks.com/cdn/shop/products/star-wars-playing-cards-uspccplayingcarddeckscom-26241701.jpg?v=1589295022&width=1445",
      }}
    />
  );

  const content = (
    <>
      <StickyHeaderMain setCardList={setCardList} />
      <CardList hp="2" cardList={cardList} />
    </>
  );

  // Use ParallaxScrollView only on mobile platforms
  if (Platform.OS !== "web") {
    return (
      <SafeAreaView style={styles.container}>
        <ParallaxScrollView
          headerImage={<HeaderImage />}
          headerBackgroundColor={{ dark: "#1F2937", light: "#F3F4F6" }}
        >
          {content}
        </ParallaxScrollView>
      </SafeAreaView>
    );
  }

  // Simpler layout for web
  return <SafeAreaView style={styles.container}>{content}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
});
