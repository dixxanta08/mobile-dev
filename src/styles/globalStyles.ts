import { StyleSheet } from "react-native";

export const colors = {
  background: "#F7EA84",
  header: "#242444",
  surface: "#2a2a4a",
  primary: "#4fc3f7",
  text: "#ffffff",
  textSecondary: "#a0a0b0",
  alert: "#ff5252",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
  },
});
