import { useFonts } from "expo-font";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import Storage from "@/utils/storage";

export default function AddTaskModal({ visible, setVisible, onTaskAdded }) {
  const [loaded] = useFonts({
    "Baloo2-Regular": require("../../assets/fonts/Baloo2-VariableFont_wght.ttf"),
  });
  const [inputFocused, setInputFocused] = React.useState(false);
  const [taskType, setTaskType] = React.useState(""); // "Truth" or "Dare"
  const [taskText, setTaskText] = React.useState("");
  const [buttonEnabled, setButtonEnabled] = React.useState(false);

  React.useEffect(() => {
    if (taskType === "Truth" || taskType === "Dare") {
      setButtonEnabled(taskText.trim().length > 0);
    } else {
      setButtonEnabled(false);
    }
  }, [taskType, taskText]);

  const handleSubmit = async (type, text) => {
    const tasks = (await Storage.get("tasks")) || {
      truth: [],
      dare: [],
    };

    const task = {
      id: Date.now().toString(),
      text,
    };

    if (type === "Truth") {
      tasks.truth.push(task);
    } else {
      tasks.dare.push(task);
    }

    await Storage.set("tasks", tasks);
    setVisible(false);
    setTaskType("");
    setTaskText("");
    setButtonEnabled(false);
    onTaskAdded(); // Notify parent to refresh the list
  };
  if (!loaded) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={() => setVisible(false)}
    >
      {/* Full screen dim backdrop */}
      <View style={styles.modalOverlay}>
        {/* The Card Container */}
        <View style={styles.modalContent}>
          {/* Header Row */}
          <View style={styles.modalHeader}>
            <Text style={styles.headerText}>Add New</Text>
            <Pressable
              style={({ pressed, hovered }) => [
                styles.closeButton,
                hovered && styles.closeButtonHover,
                pressed && styles.closeButtonPressed,
              ]}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
          </View>

          {/* truth or dare button */}
          <View style={styles.buttonRow}>
            {/* Truth button */}
            <Pressable
              style={({ pressed, hovered }) => [
                styles.filterButton,
                styles.truthButton,
                taskType === "Truth" && styles.activeFilterButton,
                hovered && styles.hoveredTruthButton,
                hovered && taskType !== "Truth" && styles.hoveredButton,
                pressed && styles.pressedButton,
              ]}
              onPress={() => setTaskType("Truth")}
            >
              <Text style={styles.buttonIcon}>👁️</Text>
              <Text style={styles.buttonText}>Truth</Text>
            </Pressable>
            {/* Dare Button */}
            <Pressable
              style={({ pressed, hovered }) => [
                styles.filterButton,
                styles.dareButton,
                taskType === "Dare" && styles.activeFilterButton,
                hovered && styles.hoveredDareButton,
                hovered && taskType !== "Dare" && styles.hoveredButton,
                pressed && styles.pressedButton,
              ]}
              onPress={() => setTaskType("Dare")}
            >
              <Text style={styles.buttonIcon}>🔥</Text>
              <Text style={styles.buttonText}>Dare</Text>
            </Pressable>
          </View>

          {/* form */}
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Your {taskType} Question</Text>
            <TextInput
              placeholder={
                taskType === "Truth"
                  ? "e.g. What is your biggest fear?"
                  : "e.g. Do 20 push-ups!"
              }
              placeholderTextColor="#A3A3A3"
              style={[
                styles.textInput,
                inputFocused
                  ? styles.textInputActive
                  : styles.textInputInactive,
              ]}
              multiline={true}
              maxLength={200}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              onChangeText={(text) => {
                setTaskText(text);
                setButtonEnabled(text.trim().length > 0); // Enable button if there's any non-whitespace text
              }}
            />
            <Text style={styles.charCount}>{`${taskText.length}`}/200</Text>
          </View>
          {/* submit button */}
          <Pressable
            disabled={!buttonEnabled}
            style={({ pressed, hovered }) => [
              styles.submitButton,
              buttonEnabled
                ? styles.submitButtonEnabled
                : styles.submitButtonDisabled,

              hovered && buttonEnabled && styles.hoveredButton,
              pressed && buttonEnabled && styles.pressedButton,
            ]}
            onPress={() => handleSubmit(taskType, taskText.trim())}
          >
            <Text
              style={[
                styles.submitButtonText,
                !buttonEnabled && styles.submitButtonTextDisabled,
              ]}
            >
              Add to List
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Dims the screen behind the card
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FBF3CA", // Light cream color from image
    width: "95%", // Adjusted for precise side padding
    padding: 20, // Interior padding for contents
    borderRadius: 32, // Smooth rounded corners matching the UI
    borderWidth: 4, // Thicker border
    borderColor: "#121212", // Dark borders
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    fontFamily: "Baloo2-Regular", // Consistent font
  },

  modalHeader: {
    flexDirection: "row", // 'display: flex' is default in React Native
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20, // Space below the header row
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#121212",
    fontFamily: "Baloo2-Regular",
  },
  closeButton: {
    backgroundColor: "#000000", // Dark circle wrapper for the 'X'
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
    fontFamily: "Baloo2-Regular",
  },
  closeButtonHover: {
    transform: [{ scale: 1.08 }],
  },

  closeButtonPressed: {
    transform: [{ scale: 0.92 }],
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 16, // Space between the two buttons
  },
  filterButton: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#121212",
    // --- Neubrutalism Hard Shadow ---
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 }, // Drops the shadow straight down
    shadowOpacity: 1,
    shadowRadius: 0, // CRITICAL: Makes the shadow sharp/flat instead of blurry
    elevation: 8, // Android equivalent flat shadow engine
  },
  activeFilterButton: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    transform: [{ translateY: 4 }],
  },
  pressedButton: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    transform: [{ translateY: 4 }],
    opacity: 0.95,
  },
  hoveredButton: {
    transform: [{ translateY: -2 }],
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  hoveredTruthButton: {
    backgroundColor: "#c0faf8",
  },
  hoveredDareButton: {
    backgroundColor: "#fac8d1",
  },
  truthButton: {
    backgroundColor: "#A0E7E5",
    flex: 1,
  },
  dareButton: {
    backgroundColor: "#FFAEBC",
    flex: 1,
  },
  buttonIcon: {
    fontSize: 18,
  },
  buttonText: {
    fontFamily: "Baloo2-Regular",
    fontWeight: "900",
    fontSize: 18,
  },

  formContainer: {
    marginTop: 24,
  },
  formLabel: {
    fontFamily: "Baloo2-Regular",
    fontWeight: "700",
    fontSize: 14,
  },
  textInput: {
    outlineColor: "transparent", // For web: fully removes default focus rings
    borderWidth: 2,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    padding: 12,
    fontFamily: "Baloo2-Regular",
    fontSize: 14,

    // Dimensions
    minHeight: 120,
    height: 120,
    maxHeight: 120,
    textAlignVertical: "top",
    textAlign: "left",

    // 👇 Core Neubrutalism Shadow Settings
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0, // 0 radius gives that hard, sharp comic-book edge
    elevation: 8, // For Android support
  },

  // 1. INACTIVE STATE (High offset shadow)
  textInputInactive: {
    borderColor: "#000000",
    shadowOffset: { width: 4, height: 6 }, // 👈 Hard shadow cast to bottom-right
    transform: [{ translateY: 0 }], // 👈 Default position
  },

  // 2. ACTIVE STATE (Low offset shadow - looks pressed down)
  textInputActive: {
    borderColor: "#262626",
    shadowOffset: { width: 1, height: 2 }, // 👈 Shadow shrinks closer to the box
    transform: [{ translateY: 4 }], // 👈 Smoothly pushes the layout down by 4px
  },

  charCount: {
    fontFamily: "Baloo2-Regular",
    fontWeight: "400",
    color: "#646150",
    fontSize: 12,
    alignSelf: "flex-end",
    marginTop: 4,
  },
  submitButton: {
    paddingVertical: 14,
    borderWidth: 3,
    borderColor: "#000000",
    borderRadius: 18,
    marginTop: 24,
    alignItems: "center",

    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },

  // 1. ENABLED STATE (3D effect standing tall)
  submitButtonEnabled: {
    backgroundColor: "#979178", // Your brand olive/gold color
    shadowOffset: { width: 0, height: 6 }, // Thick shadow
    transform: [{ translateY: 0 }],
  },

  // 2. DISABLED STATE (Flat on the background, no shadow)
  submitButtonDisabled: {
    backgroundColor: "#C4C2B3", // Lighter, muted/desaturated version for disabled
    shadowOffset: { width: 0, height: 0 }, // Removes shadow completely
    transform: [{ translateY: 4 }], // Sits flat on the layout
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontFamily: "Baloo2-Regular",
    fontWeight: "700",
    fontSize: 16,
  },

  submitButtonTextDisabled: {
    color: "#E5E5E5", // Slightly dimmed text for readability
  },
});
