import { PropsWithChildren } from "react";
import { SafeAreaView, StyleSheet, Platform, Image } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function ContentWrapper({ children }: PropsWithChildren) {
  const HeaderImage = () => (
    <Image
      style={{ height: "100%", width: "100%" }}
      source={{
        uri: "https://playingcarddecks.com/cdn/shop/products/star-wars-playing-cards-uspccplayingcarddeckscom-26241701.jpg?v=1589295022&width=1445",
      }}
    />
  );

  // Use ParallaxScrollView only on mobile platforms
  if (Platform.OS !== "web") {
    return (
      <SafeAreaView style={styles.container}>
        <ParallaxScrollView
          headerImage={<HeaderImage />}
          headerBackgroundColor={{ dark: "#1F2937", light: "#F3F4F6" }}
        >
          {children}
        </ParallaxScrollView>
      </SafeAreaView>
    );
  }

  // Simpler layout for web
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
});
