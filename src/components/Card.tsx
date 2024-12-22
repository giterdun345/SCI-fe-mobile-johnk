import { CardData } from "@/types/CardsTypes";
import React, { PropsWithChildren } from "react";
import { View, Text, Image, StyleSheet, StyleProp, ViewStyle } from "react-native";

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
        <Block row style={{ marginLeft: 16, marginTop: 16, marginBottom: 8 }}>
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
  style?: StyleProp<ViewStyle>
  flex?: ViewStyle["flex"];
  row?: boolean
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
    row && { flexDirection: 'row' } as ViewStyle,
    style,
  ])

  return (
    <View style={blockStyle} {...props}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1F2937",
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    marginLeft: 8,
    marginTop: -3,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  cardTitle: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    margin: 16,
  },

  image: {
    width: 300,
    height: 300,
    borderRadius: 65 // TODO: ask about white tips on the images
  },

  dataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },

  detail: {
    fontSize: 16,
    color: "#D1D5DB",
    marginBottom: 2,
  },

  traits: {
    fontSize: 16,
    color: "#D1D5DB",
    marginBottom: 8,
  }
});

