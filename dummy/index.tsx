import { useFonts } from "expo-font";
import { StyleSheet, Text, View } from "react-native";
import PixelEye from "../../assets/icons/PixelEye";
import PixelStar from "../../assets/icons/PixelStar";

export default function HomeScreen() {
  const [loaded] = useFonts({
    "Baloo2-Regular": require("../../assets/fonts/Baloo2-VariableFont_wght.ttf"),
  });

  if (!loaded) return null;

  return (
    <View style={styles.container}>
      <View style={{ position: "relative", width: "100%" }}>
        <Text style={styles.text}>Truth or Dare</Text>

        <PixelStar size={24} color="#7baee8" style={styles.pixelStarIcon} />
      </View>
      <View style={styles.optionsContainer}>
        <PixelEye size={48} color="#000000" style={styles.optionIcon} />
        <Text style={styles.optionText}>Truth</Text>
      </View>
      <View style={styles.optionsContainer}>
        <PixelEye size={48} color="#000000" style={styles.optionIcon} />
        <Text style={styles.optionText}>Dare</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7EA84",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 64,
    paddingHorizontal: 16,
  },

  text: {
    backgroundColor: "#000000",
    color: "#ffffff",
    fontSize: 48,
    fontFamily: "Baloo2-Regular",
    fontWeight: "600",
    width: "100%",
    height: 72,
    borderRadius: 16,
    textAlign: "center",
    lineHeight: 72,
  },

  pixelStarIcon: {
    position: "absolute",
    bottom: -24,
    right: 0,
    transform: [{ rotate: "12deg" }],
  },

  optionsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 32,
    border: "8px solid #000000",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    backgroundColor: "#bbe3e3",
  },
  optionIcon: {},

  optionText: {
    color: "#000000",
    fontSize: 48,
    fontFamily: "Baloo2-Regular",
    fontWeight: "600",
    width: "100%",
    // height: 72,
    // borderRadius: 16,
    textAlign: "center",
    // lineHeight: 72,
  },
});
