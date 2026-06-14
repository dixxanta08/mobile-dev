import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function prepare() {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      setLoading(false);
      await SplashScreen.hideAsync();
    }

    prepare();
  }, []);

  return (
    <>
      {loading ? (
        <View style={styles.container}>
          <LottieView
            source={require("../../assets/lottie/splash.json")}
            autoPlay
            loop={false}
            resizeMode="cover"
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
            }}
          />
        </View>
      ) : (
        <Stack screenOptions={{ headerShown: false }} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
});
