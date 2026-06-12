
## 1. Create An Expo Account & Install The EAS CLI

Go to [expo.dev](https://expo.dev/) and create a free account. This will allow you to use EAS(Expo Application Services) for building and deploying your app later on.

Click on "Create Project" and give it a name.

Once you create your project, you will see a list of commands to run.

Start by installing the Expo CLI globally on your machine:

```bash
npm install -g eas-cli
```

This will install the EAS tool to allow you to build and deploy your app later on.

## 2. Create React Native App

Navigate to where you want to create your project and use the following command to create a new React Native app using Expo:

```bash
npx create-expo-app@latest --template default@sdk-55
```

This will create a new React Native app with the latest Expo SDK. It will ask for a name. I will call it **macrozone**.

## 3. Initialize The EAS Project

Run the command that it gives you after creating the project to initialize the EAS project. It will look like this but with your own project ID:

```bash
eas init --id 6ea729d8-cce3-463a-a1f2-2ef8744d36ea
```

This will link your local project to the Expo account you created earlier and allow you to use EAS for building and deploying your app.

## 4. Running the App

Run the following command to start the Expo development server:

```bash
npm start (or `expo start`)
```

From here, you can open your project in multiple platforms. You can run it in the iOS Simulator, Android Emulator, or in the web browser using React Native Web.

- Press `i` to open in iOS Simulator (Requires macOS & Xcode)
- Press `a` to open in Android Emulator (Requires Android Studio)
- Press `w` to open in the web browser (Uses React Native Web)
- Scan the QR code with the Expo Go app on your phone to run it on your physical device

You can also use the following commands to run the app on specific platforms:

```bash
# To run in the iOS Simulator (Requires macOS & Xcode)
npm run ios
# To run in the Android Emulator (Requires Android Studio)
npm run android
# To run in the web browser (Uses React Native Web)
npm run web
```

## 5. Resetting the Project

Clear out the boilerplate code:

```bash
npm run reset-project
```

## 6. Live Reloading

Open `src/app/index.tsx` and change the text to "Hello World":

```ts
 <View style={styles.container}>
    <Text>Hello World</Text>
  </View>
```

Save and you should see the changes immediately in the simulator or web browser.

### Force Simulator Reload

You can also force a reload in the simulator if you want to make sure you're seeing the latest changes:

```bash
# For iOS Simulator
Cmd + R
# Or use the devtools (Cmd + D) and select "Reload" from the menu that appears
```

```bash
# For Android Emulator
Ctrl + M
# Then select "Reload" from the menu that appears
```

## 7. Remove The DevTools Icon

To remove the devtools icon that appears in the top right corner of the app, click on it and uncheck the "Tools Button" option in the menu that appears. You can still access the devtools by pressing Cmd + D


## 8. Dependencies (Expo React Native Project Setup)

Below is your full install command followed by a breakdown of what each dependency does.

---

## 📦 Install Command

```bash
npm install \
@expo/vector-icons \
@lottiefiles/dotlottie-react \
@react-native-async-storage/async-storage \
@react-navigation/bottom-tabs \
@react-navigation/elements \
@react-navigation/native \
expo \
expo-av \
expo-constants \
expo-device \
expo-font \
expo-glass-effect \
expo-image \
expo-linking \
expo-router \
expo-splash-screen \
expo-status-bar \
expo-symbols \
expo-system-ui \
expo-web-browser \
lottie-react-native \
pixelarticons \
react \
react-dom \
react-native \
react-native-gesture-handler \
react-native-reanimated \
react-native-safe-area-context \
react-native-screens \
react-native-svg \
react-native-web \
react-native-worklets
```
## 🧠 Core Framework

### `expo`
Main framework for building React Native apps using the managed workflow.

### `react` / `react-native`
Core libraries:

- **React** → Handles UI logic and component structure  
- **React Native** → Provides native mobile components like `View`, `Text`, etc.

### `expo-router`
File-based routing system (similar to Next.js, but for mobile apps).

---

## 🧭 Navigation

### `@react-navigation/native`
Core navigation library for managing screen navigation.

### `@react-navigation/bottom-tabs`
Used for bottom tab navigation (your app’s tab bar).

### `@react-navigation/elements`
Provides prebuilt UI components like headers and layouts for navigation.

---

## 🎬 Animations & UI Effects

### `lottie-react-native`
Runs Lottie animations for splash screens, loaders, and UI effects.

### `@lottiefiles/dotlottie-react`
Optimized Lottie renderer for web and cross-platform animation support.

### `react-native-reanimated`
High-performance animation library for gestures and complex UI animations.

---

## 💾 Storage & Utilities

### `@react-native-async-storage/async-storage`
Simple persistent storage for saving small data locally (tokens, settings, etc.).

---

## 🎨 UI & Icons

### `@expo/vector-icons`
Icon library used in Expo projects (Material, Ionicons, etc.).

### `pixelarticons`
Pixel-style icon set for retro or game-like UI design.

---

## 🧩 Media & System Features

### `expo-av`
Audio and video playback support.

### `expo-image`
Optimized image component for better performance.

### `expo-font`
Loads custom fonts in your app.

### `expo-splash-screen`
Controls and customizes the splash screen.

### `expo-status-bar`
Manages the status bar appearance.

### `expo-system-ui`
Controls system UI elements like navigation bars.

### `expo-web-browser`
Opens external links inside a secure browser view.

---

## 📱 Platform & Device APIs

### `expo-device`
Provides device information (model, OS, etc.).

### `expo-constants`
Access app and device constants (build version, etc.).

### `expo-linking`
Handles deep linking and URL navigation.

---

## 🌐 Cross-Platform Support

### `react-dom`
Enables React Native web support.

### `react-native-web`
Runs React Native components in the browser.

---

## ⚙️ Core Native Infrastructure

### `react-native-gesture-handler`
Handles touch gestures like swipes and taps.

### `react-native-safe-area-context`
Manages safe area spacing (notches, status bar spacing).

### `react-native-screens`
Optimizes memory and performance for navigation screens.

### `react-native-svg`
Adds support for SVG rendering in React Native.

### `react-native-worklets`
Enables advanced animation and thread-based execution (used with Reanimated).



````md
## 🎮 Truth or Dare HomeScreen Build Guide (React Native + Expo)

This guide breaks down the development of the `HomeScreen` into clear steps:
1. Static UI first  
2. Fonts  
3. Styling system  
4. Sound integration  
5. Navigation flow  

---

## 🧱 Step 1: Build Static UI (No Logic)

Start with a simple layout structure without any state, sound, or navigation.

```tsx
import React from "react";
import { Text, View, Pressable } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <View>
        <Text>TRUTH OR DARE</Text>
      </View>

      <View>
        <Pressable>
          <Text>Truth</Text>
        </Pressable>

        <Pressable>
          <Text>Dare</Text>
        </Pressable>
      </View>
    </View>
  );
}
````

Goal:

* Just layout structure
* No fonts, no animations, no logic

---

## 🎨 Step 2: Add Custom Font (expo-font)

Install font loader:

```bash
expo install expo-font
```

Load font in component:

```tsx
import { useFonts } from "expo-font";

const [loaded] = useFonts({
  "Baloo2-Regular": require("../../../assets/fonts/Baloo2-VariableFont_wght.ttf"),
});

if (!loaded) return null;
```

Apply font:

```tsx
<Text style={{ fontFamily: "Baloo2-Regular" }}>
  TRUTH OR DARE
</Text>
```

Goal:

* Ensure UI renders only after fonts load
* Apply consistent typography

---

## 🎨 Step 3: Add Styling System (Neubrutalism UI)

Create structured styles using `StyleSheet`.

```tsx
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
  },

  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    fontFamily: "Baloo2-Regular",
  },

  choiceContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 24,
  },

  choiceCard: {
    flex: 1,
    borderWidth: 4,
    borderColor: "#000",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 2, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },

  truthCard: {
    backgroundColor: "#AEE2E6",
  },

  dareCard: {
    backgroundColor: "#FBC3CD",
  },

  choiceText: {
    fontSize: 48,
    fontWeight: "900",
    color: "#000",
    fontFamily: "Baloo2-Regular",
  },
});
```

Goal:

* Build reusable card system
* Create bold “neubrutalism” UI feel

---

## 🔊 Step 4: Add Sound System (expo-av)

Install:

```bash
expo install expo-av
```

Import:

```tsx
import { Audio } from "expo-av";
```

### Load sounds on mount

```tsx
const [truthSound, setTruthSound] = React.useState(null);
const [dareSound, setDareSound] = React.useState(null);

React.useEffect(() => {
  async function loadSounds() {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
    });

    const { sound: t } = await Audio.Sound.createAsync(
      require("../../../assets/sounds/click1short.mp3")
    );

    const { sound: d } = await Audio.Sound.createAsync(
      require("../../../assets/sounds/click2short.mp3")
    );

    setTruthSound(t);
    setDareSound(d);
  }

  loadSounds();
}, []);
```

### Play sound functions

```tsx
async function playTruthSound() {
  await truthSound?.setPositionAsync(0);
  await truthSound?.playAsync();
}

async function playDareSound() {
  await dareSound?.setPositionAsync(0);
  await dareSound?.playAsync();
}
```

Goal:

* Preload sounds once
* Instant feedback on tap

---

## 🧠 Step 5: Add Navigation (expo-router)

Install:

```bash
expo install expo-router
```

Import router:

```tsx
import { router } from "expo-router";
```

### Navigate on press

```tsx
<Pressable
  onPressIn={() => {
    playTruthSound();

    setTimeout(() => {
      router.push({
        pathname: "/loading",
        params: { mode: "truth" },
      });
    }, 100);
  }}
>
```

Goal:

* Smooth transition after click
* Pass state via route params

---

## 🚀 Final Flow Summary

1. Render static UI
2. Load fonts before render
3. Apply styled UI system
4. Preload & play sounds instantly
5. Navigate with expo-router

---

## 🧩 Result

You now have:

* ⚡ Instant audio feedback
* 🎨 Bold neumorphic UI
* 🔤 Custom typography system
* 🧭 Clean navigation flow
* 📱 Smooth mobile interaction design

```
```
