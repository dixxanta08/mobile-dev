import { useFonts } from "expo-font";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const [loaded] = useFonts({
    "Baloo2-Regular": require("../../assets/fonts/Baloo2-VariableFont_wght.ttf"),
  });

  const dares = [
    "Do 10 pushups",
    "Sing a song loudly",
    "Dance for 30 seconds",
    "Talk in an accent for 1 minute",
    "Send a random emoji to a friend",
    "Spin around 10 times",
  ];

  const [task, setTask] = React.useState(dares[0]);

  if (!loaded) return null;

  const handleReroll = () => {
    let elapsed = 0;

    const interval = setInterval(() => {
      const random = dares[Math.floor(Math.random() * dares.length)];
      setTask(random);

      elapsed += 100;

      if (elapsed >= 1000) {
        clearInterval(interval);

        // final pick (lock-in effect)
        const final = dares[Math.floor(Math.random() * dares.length)];
        setTask(final);
      }
    }, 100);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBlock}>
        <Text style={styles.headerText}>Dare</Text>
      </View>

      {/* Task */}
      <View style={styles.taskContainer}>
        <Text style={styles.taskText}>{task}</Text>
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
