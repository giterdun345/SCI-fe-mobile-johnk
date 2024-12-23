import { Dispatch, SetStateAction } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import type { CardData } from "@/types/CardsTypes";

interface SortButtonGroupProps {
  sortKey: keyof CardData;
  setSortKey: Dispatch<SetStateAction<keyof CardData>>;
  loading: boolean;
  error: string | null;
  hasCards: boolean;
}

export default function SortButtonGroup({
  sortKey,
  setSortKey,
  loading,
  error,
  hasCards,
}: SortButtonGroupProps) {
  const renderSortButton = (
    label: string,
    key: keyof CardData,
    color: string,
  ) => (
    <TouchableOpacity
      style={[styles.sortButton, { backgroundColor: color }]}
      onPress={() => {
        setSortKey(key);
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

  if (hasCards) {
    return (
      <View style={styles.container}>
        <Text style={styles.messageText}>No cards found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.searchParamText}>
        {sortKey ? `Sorting by: ${sortKey}` : ""}
      </Text>
      <View style={styles.sortButtons}>
        {renderSortButton("Name", "name", "#3B82F6")}
        {renderSortButton("Set", "set", "#10B981")}
        {renderSortButton("Cost", "cost", "#8B5CF6")}
        {renderSortButton("Power", "power", "#EF4444")}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    width: 150,
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
  searchParamText: {
    color: "#FFFFFF",
    fontSize: 16,
    padding: 16,
  },
});
