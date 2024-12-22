// Dropdown.tsx
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";

import { useFetchCatalog } from "@/hooks/useFetchCatalog";

type DropdownProps = {
  onSelect: (selectedValue: string) => void;
};

export default function Dropdown({ onSelect }: DropdownProps) {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const { options, loading, error } = useFetchCatalog();
  if (loading) {
    return <ActivityIndicator size="large" accessibilityHint="loading" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Picker
        testID="picker"
        selectedValue={selectedValue}
        onValueChange={(itemValue: string) => {
          setSelectedValue(itemValue);
          onSelect(itemValue);
        }}
        style={styles.picker}
      >
        <Picker.Item label="Select HP" value="" />
        {options.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#4B5563",
    borderRadius: 8,
    backgroundColor: "#374151",
  },
  picker: {
    color: "#FFFFFF",
    height: 50,
  },
  loadingText: {
    textAlign: "center",
    color: "#FFFFFF",
    padding: 10,
  },
  errorText: {
    textAlign: "center",
    color: "#EF4444",
    padding: 10,
  },
});
