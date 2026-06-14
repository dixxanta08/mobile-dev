import { Audio } from "expo-av";
import { useFonts } from "expo-font";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [loaded] = useFonts({
    "Baloo2-Regular": require("../../../assets/fonts/Baloo2-VariableFont_wght.ttf"),
  });
  const [pressedCard, setPressedCard] = React.useState<"truth" | "dare" | null>(
    null,
  );
  // Separate states to hold our preloaded sound objects
  const [truthSound, setTruthSound] = React.useState(null);
  const [dareSound, setDareSound] = React.useState(null);

  if (!loaded) return null;

  // Preload both audio systems on component mount
  React.useEffect(() => {
    async function loadAllSounds() {
      try {
        // Configure general low-latency system audio mode
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });

        // Load Truth Sound (e.g., a crisp, high-pitched mechanical click)
        const { sound: loadedTruth } = await Audio.Sound.createAsync(
          require("../../../assets/sounds/click1short.mp3"),
          { shouldPlay: false, downloadFirst: true },
        );
        setTruthSound(loadedTruth);

        // Load Dare Sound (e.g., a slightly heavier, deeper mechanical clack)
        const { sound: loadedDare } = await Audio.Sound.createAsync(
          require("../../../assets/sounds/click2short.mp3"),
          { shouldPlay: false, downloadFirst: true },
        );
        setDareSound(loadedDare);
      } catch (error) {
        console.log("Error preloading game sounds:", error);
      }
    }

    loadAllSounds();

    // Clean up memory when user leaves the screen
    return () => {
      if (truthSound) truthSound.unloadAsync();
      if (dareSound) dareSound.unloadAsync();
    };
  }, []);

  // Dedicated trigger functions that bypass React render cycles for zero latency
  async function playTruthSound() {
    if (truthSound) {
      try {
        await truthSound.setPositionAsync(0);
        await truthSound.playAsync();
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function playDareSound() {
    if (dareSound) {
      try {
        await dareSound.setPositionAsync(0);
        await dareSound.playAsync();
      } catch (e) {
        console.log(e);
      }
    }
  }
  return (
    <View style={styles.container}>
      {/* Title Header Block */}
      <View style={styles.headerBlock}>
        <Text style={styles.headerText}>TRUTH OR DARE</Text>
      </View>

      {/* Main Choice Container */}
      <View style={styles.choiceContainer}>
        {/* TRUTH CARD */}
        <Pressable
          onPressIn={() => {
            setPressedCard("truth");
            playTruthSound();

            setTimeout(() => {
              router.push({
                pathname: "/loading",
                params: { mode: "truth" },
              });
            }, 100);
          }}
          onPressOut={() => setPressedCard(null)}
          onPress={() => console.log("Truth Activated")}
          style={[
            styles.choiceCard,
            styles.truthCard,
            pressedCard === "truth" && styles.cardPressed, // Applies the click shift
          ]}
        >
          <View style={styles.choiceIcon}>
            <Text style={{ fontSize: 32 }}>👁️</Text>
          </View>
          <Text style={styles.choiceText}>Truth</Text>
        </Pressable>

        {/* DARE CARD */}
        <Pressable
          onPressIn={() => {
            setPressedCard("dare");
            playDareSound();

            setTimeout(() => {
              router.push({
                pathname: "/loading",
                params: { mode: "dare" },
              });
            }, 100);
          }}
          onPressOut={() => setPressedCard(null)}
          onPress={() => console.log("Dare Activated")}
          style={[
            styles.choiceCard,
            styles.dareCard,
            pressedCard === "dare" && styles.cardPressed, // Applies the click shift
          ]}
        >
          <View style={styles.choiceIcon}>
            <Text style={{ fontSize: 32 }}>🔥</Text>
          </View>
          <Text style={styles.choiceText}>Dare</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2e6bf",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  headerBlock: {
    backgroundColor: "#000000",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 32,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 1.5,
    fontFamily: "Baloo2-Regular",
  },

  // The layout wrapper for your choices
  choiceContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 24, // Space between Truth and Dare cards
    marginBottom: 40,
  },

  // Base styles for both cards
  choiceCard: {
    flex: 1,
    borderWidth: 4,
    borderColor: "#000000",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,

    // --- Neubrutalism Hard Shadow ---
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 8 }, // Drops the shadow straight down
    shadowOpacity: 1,
    shadowRadius: 0, // CRITICAL: Makes the shadow sharp/flat instead of blurry
    elevation: 8, // Android equivalent flat shadow engine
  },

  // Specific card background color blocks
  truthCard: {
    backgroundColor: "#AEE2E6", // Pastel Blue/Teal
  },
  dareCard: {
    backgroundColor: "#FBC3CD", // Pastel Pink
  },

  // The Icon Container
  choiceIcon: {
    // marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
    // You can also add specific dimensions or pixel borders here if needed:
    // width: 64,
    // height: 64,
  },

  // Text Styling
  choiceText: {
    fontSize: 48, // Large impact display size
    fontWeight: "900", // Boldest native weight
    color: "#000000",
    letterSpacing: -0.5,

    fontFamily: "Baloo2-Regular", // Use your custom rounded font bundle here
  },

  cardPressed: {
    // 1. Shift the card down to physically match the shadow height
    transform: [{ translateX: 2 }, { translateY: 8 }],
    // 2. Erase the shadow instantly so it looks flat against the background floor
    shadowOffset: { width: 2, height: 0 },
    elevation: 0,
  },
});
