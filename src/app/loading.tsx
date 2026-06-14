import { router, useLocalSearchParams } from "expo-router";
import LottieView from "lottie-react-native";
import { View } from "react-native";

type Mode = "truth" | "dare";

export default function LoadingScreen() {
  const { mode } = useLocalSearchParams<{ mode?: Mode }>();

  const safeMode: Mode = mode === "dare" ? "dare" : "truth";
  return (
    <View style={styles.container}>
      <View style={styles.lottieBox}>
        <LottieView
          source={require("../../assets/lottie/loading.json")}
          autoPlay
          loop={false}
          onAnimationFinish={() => {
            router.replace(`/${safeMode}`);
          }}
          style={styles.lottie}
        />
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },

  lottieBox: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },

  lottie: {
    width: 120,
    height: 120,
  },
};
