import { Tabs } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const tabs = [
  { name: "about", label: "About", icon: "ℹ️" },
  { name: "index", label: "Home", icon: "🏠" },
  { name: "manage", label: "Manage", icon: "⚙️" },
];

function TabButton({ item, isFocused, onPress }) {
  return (
    <Pressable onPress={onPress} style={{ flex: 1 }}>
      <View style={[styles.tab, isFocused && styles.tabActive]}>
        <Text style={[styles.icon, isFocused && styles.iconActive]}>
          {item.icon}
        </Text>

        <Text style={[styles.label, isFocused && styles.labelActive]}>
          {item.label}
        </Text>
      </View>
    </Pressable>
  );
}

export default function Layout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ state, navigation }) => {
        return (
          <View style={styles.container}>
            {state.routes.map((route, index) => {
              const isFocused = state.index === index;

              return (
                <TabButton
                  key={route.key}
                  item={tabs[index]}
                  isFocused={isFocused}
                  onPress={() => navigation.navigate(route.name)}
                />
              );
            })}
          </View>
        );
      }}
    >
      <Tabs.Screen name="about" />
      <Tabs.Screen name="index" />
      <Tabs.Screen name="manage" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F7EA84",
    border: "2px solid #000",

    padding: 6,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 12,
  },

  tabActive: {
    backgroundColor: "#000000",
  },

  icon: {
    fontSize: 16,
    color: "#000",
  },

  iconActive: {
    color: "#fff",
  },

  label: {
    fontSize: 10,
    marginTop: 2,
    fontWeight: "700",
    color: "#000",
  },

  labelActive: {
    color: "#fff",
  },
});
