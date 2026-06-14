import { useFonts } from "expo-font";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function FilterTaskType({
  activeFilter,
  setActiveFilter,
  truthCount,
  dareCount,
}) {
  const [loaded] = useFonts({
    "Baloo2-Regular": require("../../assets/fonts/Baloo2-VariableFont_wght.ttf"),
  });
  if (!loaded) return null;
  return (
    <View style={styles.filterTabs}>
      <Pressable
        style={[
          styles.filterTab,
          activeFilter === "Truth" && styles.activeFilterTab,
        ]}
        onPress={() => setActiveFilter("Truth")}
      >
        <Text style={styles.filterTabIcon}>👁️</Text>
        <Text style={styles.filterTabText}>Truth</Text>
        <Text style={styles.filterTabCount}>{truthCount}</Text>
      </Pressable>
      <Pressable
        style={[
          styles.filterTab,
          activeFilter === "Dare" && styles.activeFilterTab,
        ]}
        onPress={() => setActiveFilter("Dare")}
      >
        <Text style={styles.filterTabIcon}>🔥</Text>
        <Text style={styles.filterTabText}>Dare</Text>
        <Text style={styles.filterTabCount}>{dareCount}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  filterTabs: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 6,
    borderWidth: 2,
    borderColor: "#000000",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 16,

    // neobrutalism shadow
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    marginBottom: 32,
  },
  filterTab: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    padding: 6,
    borderRadius: 24,
    flex: 1,
    borderWidth: 2,
    borderColor: "transparent",
  },
  activeFilterTab: {
    borderColor: "#000000",
    backgroundColor: "#b8e3e0",
  },
  filterTabIcon: {
    // no styles needed
  },
  filterTabText: {
    fontFamily: "Baloo2-Regular",
    fontWeight: "700",
    fontSize: 14,
  },
  filterTabCount: {
    color: "#ffffff",
    backgroundColor: "#000000",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: "100%",
    fontFamily: "Baloo2-Regular",
    fontWeight: "700",
    fontSize: 12,
  },
});
