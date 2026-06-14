import { useFonts } from "expo-font";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function AboutScreen() {
  const [loaded] = useFonts({
    "Baloo2-Regular": require("../../../assets/fonts/Baloo2-VariableFont_wght.ttf"),
  });
  if (!loaded) return null;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        {/* The ScrollView replaces the main View container.
        contentContainerStyle ensures everything aligns nicely and 
        provides padding at the bottom so elements aren't cut off.
      */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Button */}
          <View style={styles.headerBanner}>
            <Text style={styles.headerText}>ABOUT</Text>
          </View>

          {/* Main Feature Card */}
          <View style={[styles.card, styles.mainCard]}>
            <Text style={styles.emojiIcon}>🎉</Text>
            <Text style={styles.cardTitle}>Truth or Dare</Text>
            <Text style={styles.cardDescription}>
              The classic party game, now in your pocket. Pick Truth or Dare,
              tap the card, and get a random prompt. Customize the deck with
              your own questions and challenges!
            </Text>
          </View>

          {/* 2x2 Grid Section */}
          <View style={styles.gridContainer}>
            <View style={styles.row}>
              <TouchableOpacity style={[styles.card, styles.spicyCard]}>
                <Text style={styles.gridEmoji}>🔥</Text>
                <Text style={styles.gridText}>Amazing Dares</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.card, styles.juicyCard]}>
                <Text style={styles.gridEmoji}>👁️</Text>
                <Text style={styles.gridText}>Dramatic Truth</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity style={[styles.card, styles.addOwnCard]}>
                <Text style={styles.gridEmoji}>✏️</Text>
                <Text style={styles.gridText}>Add Your Own</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.card, styles.randomCard]}>
                <Text style={styles.gridEmoji}>🎲</Text>
                <Text style={styles.gridText}>Random Picks</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Rules Card */}
          <View style={[styles.card, styles.rulesCard]}>
            <Text style={styles.rulesTitle}>How to play</Text>
            <Text style={styles.ruleItem}>
              1. Gather your friends in a circle.
            </Text>
            <Text style={styles.ruleItem}>
              2. One person taps Truth or Dare.
            </Text>
            <Text style={styles.ruleItem}>
              3. Read the prompt out loud and do it!
            </Text>
            <Text style={styles.ruleItem}>
              4. Pass the phone. Repeat. Chaos ensues.
            </Text>
          </View>

          {/* Footer */}
          <Text style={styles.footerText}>Your first mobile app.</Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// Custom styles to match the comic/pop UI style (thick borders & rounded corners)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7E79E", // Pastel yellow background
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40, // Keeps extra breathing room at the bottom
  },
  headerBanner: {
    backgroundColor: "#000000",
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#000000",
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 1,
    fontFamily: "Baloo2-Regular",
  },
  card: {
    borderRadius: 24,
    borderWidth: 3,
    borderColor: "#000000",
    padding: 20,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0, // Crisp 2D shadow aesthetic
    elevation: 4,
  },
  mainCard: {
    backgroundColor: "#A6E3E9", // Light teal
    marginBottom: 20,
  },
  emojiIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
    fontFamily: "Baloo2-Regular",
  },
  cardDescription: {
    fontSize: 14,
    textAlign: "center",
    color: "#333333",
    fontFamily: "Baloo2-Regular",
    lineHeight: 20,
  },
  gridContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  spicyCard: {
    backgroundColor: "#FFCAD4", // Pastel Pink
    flex: 0.48,
    paddingVertical: 15,
  },
  juicyCard: {
    backgroundColor: "#B5EAEA", // Another soft teal
    flex: 0.48,
    paddingVertical: 15,
  },
  addOwnCard: {
    backgroundColor: "#FFFFFF",
    flex: 0.48,
    paddingVertical: 15,
  },
  randomCard: {
    backgroundColor: "#F4D160", // Vibrant Yellow
    flex: 0.48,
    paddingVertical: 15,
  },
  gridEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  gridText: {
    fontFamily: "Baloo2-Regular",
    fontWeight: "bold",
    fontSize: 14,
    color: "#000000",
  },
  rulesCard: {
    backgroundColor: "#FFFFFF",
    alignItems: "flex-start",
    padding: 25,
    marginBottom: 25,
  },
  rulesTitle: {
    fontSize: 22,
    fontFamily: "Baloo2-Regular",
    fontWeight: "bold",
    marginBottom: 15,
  },
  ruleItem: {
    fontSize: 14,
    fontFamily: "Baloo2-Regular",
    color: "#333333",
    marginBottom: 10,
    lineHeight: 20,
  },
  footerText: {
    textAlign: "center",
    color: "#666666",
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Baloo2-Regular",
  },
});
