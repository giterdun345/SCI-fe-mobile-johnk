import React, { PropsWithChildren } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

import { CardData } from "@/types/CardsTypes";

export default function Card({
  name,
  set,
  cost,
  power,
  hp,
  type,
  traits,
  rarity,
  frontArt,
}: CardData) {
  return (
    <View style={styles.card} testID="card">
      <Text style={styles.cardTitle}>{name}</Text>

      <Image
        testID="card-image"
        source={{ uri: frontArt }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.dataContainer}>
        <Block row style={styles.blockWrapper}>
          <Block>
            <Text style={styles.detail}>Set: {set}</Text>
            <Text style={styles.detail}>Type: {type}</Text>
            <Text style={styles.detail}>Cost: {cost}</Text>
          </Block>

          <Block>
            <Text style={styles.detail}>Power: {power}</Text>
            <Text style={styles.detail}>HP: {hp}</Text>
            <Text style={styles.detail}>Rarity: {rarity}</Text>
          </Block>
        </Block>

        <Block row>
          <Text style={styles.traits}>Traits: {traits?.join(", ")}</Text>
        </Block>
      </View>
    </View>
  );
}

interface BlockProps {
  style?: StyleProp<ViewStyle>;
  flex?: ViewStyle["flex"];
  row?: boolean;
}

function Block({
  children,
  style,
  flex = 1,
  row,
  ...props
}: PropsWithChildren<BlockProps>) {
  const blockStyle = StyleSheet.flatten([
    flex !== undefined && { flex },
    row && ({ flexDirection: "row" } as ViewStyle),
    style,
  ]);

  return (
    <View style={blockStyle} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1F2937",
  },

  cardTitle: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    margin: 16,
  },

  image: {
    minWidth: 300,
    minHeight: 300,
    // borderRadius: 65, // TODO: ask about white tips on the images
  },

  dataContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },

  blockWrapper: {
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8,
  },

  detail: {
    fontSize: 16,
    fontWeight: 600,
    color: "#D1D5DB",
    marginBottom: 3,
  },

  traits: {
    fontSize: 20,
    color: "#D1D5DB",
    marginBottom: 8,
  },
});
