import { useFonts } from "expo-font";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Storage from "../utils/storage";

export default function HomeScreen() {
  const [loaded] = useFonts({
    "Baloo2-Regular": require("../../assets/fonts/Baloo2-VariableFont_wght.ttf"),
  });
  const [truths, setTruths] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    const fetchTruths = async () => {
      const response = await Storage.get("tasks");
      setTruths(response?.truth || []);
      setIsLoading(false);
    };
    fetchTruths();
  }, []);
  const [task, setTask] = React.useState(null);

  if (!loaded) return null;

  const handleReroll = () => {
    let elapsed = 0;

    const interval = setInterval(() => {
      const random = truths[Math.floor(Math.random() * truths.length)];
      setTask(random);

      elapsed += 100;

      if (elapsed >= 1000) {
        clearInterval(interval);

        // final pick (lock-in effect)
        const final = truths[Math.floor(Math.random() * truths.length)];
        setTask(final);
      }
    }, 100);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <LottieView
          source={require("../../assets/lottie/loading.json")}
          autoPlay
          loop
          style={{ width: 150, height: 150 }}
        />
      </View>
    );
  }
  console.log("Loaded truths:", truths);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBlock}>
        <Text style={styles.headerText}>TRUTH</Text>
      </View>

      {/* Task */}
      <View style={styles.taskContainer}>
        <Text style={styles.taskText}>{task?.text || "No truth selected"}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.reroll]}
          onPress={handleReroll}
        >
          <Text style={styles.buttonText}>Reroll</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.next]}
          onPress={() => {
            router.replace("/");
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: "#f2e6bf",
    paddingHorizontal: 24,
    paddingTop: 60,
  },

  headerBlock: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 32,
  },

  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 1.5,
    fontFamily: "Baloo2-Regular",
  },

  taskContainer: {
    flex: 1,
    backgroundColor: "#f2efdc",
    borderWidth: 2, // FIXED
    borderColor: "#000",
    borderRadius: 12,
    padding: 24,
    justifyContent: "flex-start",
  },

  taskText: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Baloo2-Regular",
    color: "#000",
  },

  buttonContainer: {
    marginTop: 20,
    gap: 12, // modern RN spacing
  },

  button: {
    width: "100%",
    borderWidth: 4, // FIXED
    borderColor: "#000",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },

  reroll: {
    backgroundColor: "#AEE2E6",
  },

  next: {
    backgroundColor: "#B8F7A1",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "900",
    fontFamily: "Baloo2-Regular",
    color: "#000",
  },
};
