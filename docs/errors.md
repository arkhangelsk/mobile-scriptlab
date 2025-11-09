# How to do a full clean rebuild for iOS in React Native CLI projects

## 🧹 **1. Close Metro Bundler and Simulator**

Make sure no build or simulator is running.

```bash
# In terminal
⌃C  (Ctrl+C)  # stop Metro bundler
```

---

## 🧽 **2. Clean iOS build cache**

From your project root:

```bash
cd ios
xcodebuild clean
cd ..
```

Or if you want to be extra thorough, delete the build folder manually:

```bash
rm -rf ios/build
```

---

## 🔧 **3. Remove CocoaPods cache and reinstall**

CocoaPods sometimes caches old native dependencies (like Reanimated or Gesture Handler).

Run the following commands:

```bash
cd ios
rm -rf Pods Podfile.lock
pod cache clean --all
pod install
cd ..
```

If you get permission errors, try `sudo pod cache clean --all`.

---

## 🧰 **4. Reset Metro Bundler cache**

This ensures JavaScript and Reanimated configs refresh cleanly:

```bash
npx react-native start --reset-cache
```

Keep this terminal open while running the app.

---

## 🧼 **5. Clean Xcode Derived Data (optional but powerful fix)**

Sometimes stale builds live in Xcode’s derived data folder.
You can clean it using this command:

```bash
rm -rf ~/Library/Developer/Xcode/DerivedData
```

Or via Xcode GUI:
**Xcode → Preferences → Locations → Derived Data → Delete.**

---

## 🚀 **6. Rebuild the iOS app**

Finally, run a fresh build:

```bash
npx pod-install
npx react-native run-ios
```

Or, open the project in Xcode (`ios/YourApp.xcworkspace`) and build from there (⌘ + B).

---



## 🩺 **If you still get build errors**

Run:

```bash
cd ios
pod deintegrate
pod install
cd ..
npx react-native run-ios
```

Then check your Xcode logs for specific native module errors 

