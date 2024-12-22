// CardList.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button
} from "react-native";

import Card from "./Card";
import { searchCards, fetchCatalog } from "../api/api";
import { CardResponse } from "@/api/apiTypes";
import { transformCardResponse } from "@/utils/transformCardResponse";

import type { CardData } from "@/types/CardsTypes";

type CardListProps = {
  hp?: string;
  cardList: CardData[]
};


export default function CardList({ hp = "", cardList }: CardListProps) {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<keyof CardData>("name");

  useEffect(() => {
    const fetchCardData = async () => {
      if (!hp) {
        setCards([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await searchCards(hp);
        const formattedCards = result.data.map(transformCardResponse);

        setCards(
          formattedCards.sort((a, b) =>
            a[sortKey] < b[sortKey] ? -1 : a[sortKey] > b[sortKey] ? 1 : 0,
          ),
        );
      } catch (err) {
        //setError("Failed to load cards");
        setError(err instanceof Error ? err.message : "Failed to load cards");
      } finally {
        setLoading(false);
      }
    };

    void fetchCardData();
  }, [hp, sortKey]);

  const sortCards = (key: keyof CardData) => {
    setSortKey(key);
    setCards(
      [...cards].sort((a, b) =>
        a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0,
      ),
    );
  };

  const renderSortButton = (
    label: string,
    key: keyof CardData,
    color: string,
  ) => (
    <TouchableOpacity
      style={[styles.sortButton, { backgroundColor: color }]}
      onPress={() => {
        sortCards(key);
      }}
      accessible
      testID={`sort-by-${key}`}
    >
      <Text style={styles.sortButtonText}>Sort by {label}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>Loading cards...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (cards.length === 0) {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.messageText}>No cards found.</Text>
          <Button title="Retry" onPress={fetchCatalog} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.sortButtons}>
        {renderSortButton("Name", "name", "#3B82F6")}
        {renderSortButton("Set", "set", "#10B981")}
        {renderSortButton("Cost", "cost", "#8B5CF6")}
        {renderSortButton("Power", "power", "#EF4444")}
      </View>
      {/* <FlatList
        data={cards}
        renderItem={({ item }) => <Card {...item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        testID="card-list"
      /> */}
      {cards.map(item => <Card key={item.id}{...item} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#111827",
  },
  sortButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    flexWrap: "wrap",
    gap: 8,
  },
  sortButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 100,
  },
  sortButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 16,
  },
  messageText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 16,
    padding: 16,
  },
  errorText: {
    textAlign: "center",
    color: "#EF4444",
    fontSize: 16,
    padding: 16,
  },
});
