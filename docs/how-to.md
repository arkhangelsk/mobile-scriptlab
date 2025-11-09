- [How to do a full clean rebuild for iOS in React Native CLI projects](#how-to-do-a-full-clean-rebuild-for-ios-in-react-native-cli-projects)
  - [🧹 **1. Close Metro Bundler and Simulator**](#-1-close-metro-bundler-and-simulator)
  - [🧽 **2. Clean iOS build cache**](#-2-clean-ios-build-cache)
  - [🔧 **3. Remove CocoaPods cache and reinstall**](#-3-remove-cocoapods-cache-and-reinstall)
  - [🧰 **4. Reset Metro Bundler cache**](#-4-reset-metro-bundler-cache)
  - [🧼 **5. Clean Xcode Derived Data (optional but powerful fix)**](#-5-clean-xcode-derived-data-optional-but-powerful-fix)
  - [🚀 **6. Rebuild the iOS app**](#-6-rebuild-the-ios-app)
  - [🩺 **If you still get build errors**](#-if-you-still-get-build-errors)
- [How to Generate an APK for Android](#how-to-generate-an-apk-for-android)
  - [📍 **APK file locations**](#-apk-file-locations)
    - [🧪 **Debug build (quick testing \& automation use)**](#-debug-build-quick-testing--automation-use)
    - [🚀 **Release build (for distribution or production testing)**](#-release-build-for-distribution-or-production-testing)
- [How to Generate an IPA for iOS](#how-to-generate-an-ipa-for-ios)
  - [🧪 **1️⃣ For Appium testing on iOS simulator**](#-1️⃣-for-appium-testing-on-ios-simulator)
    - [🧭 **Build it**](#-build-it)
    - [🧩 **Use this in your Appium capabilities**](#-use-this-in-your-appium-capabilities)
  - [🚀 **2️⃣ For real iOS devices (physical)**](#-2️⃣-for-real-ios-devices-physical)
    - [🧭 **Build it**](#-build-it-1)
    - [⚙️ Use in Appium (real device)](#️-use-in-appium-real-device)
    - [💡 Quick summary](#-quick-summary)


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

---

# How to Generate an APK for Android

When building a **React Native** app, the `.apk` file (Android app package) is generated when you run a **release** or **debug** build. Here’s exactly where to find it depending on your build type: 

## 📍 **APK file locations**

### 🧪 **Debug build (quick testing & automation use)**

You can build it directly from the CLI:

```bash
cd android
./gradlew assembleDebug
```

Once that completes successfully, your `.apk` will be located at:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

You can use this file in your automation tool (e.g., Appium).

---

### 🚀 **Release build (for distribution or production testing)**

If you want a signed or optimized build:

```bash
cd android
./gradlew assembleRelease
```

Then find the release APK at:

```
android/app/build/outputs/apk/release/app-release.apk
```

If you haven’t set up signing configs, this APK will be **unsigned**. You can still use it for automation, but if you need it installable manually, sign it using:

```bash
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore my-release-key.keystore app-release-unsigned.apk alias_name
```

---


**Note**: Rebuilding cleanly before generating the APK

If you face errors or old builds:

```bash
cd android
./gradlew clean
./gradlew assembleDebug
```
---

# How to Generate an IPA for iOS

When building a **React Native** app for **iOS**, you typically need either:

* an **`.app`** bundle (for simulator use in automation), or
* an **`.ipa`** file (for real device testing or distribution).


## 🧪 **1️⃣ For Appium testing on iOS simulator**

You’ll want the **`.app`** file — not signed, not compressed.

### 🧭 **Build it**

In your React Native project root:

```bash
npx react-native run-ios --simulator="iPhone 15 Pro"
```

✅ After the build completes, your app will be here:

```
ios/build/Build/Products/Debug-iphonesimulator/scriptlab.app
```

### 🧩 **Use this in your Appium capabilities**

```js
{
  platformName: "iOS",
  deviceName: "iPhone 15",
  platformVersion: "17.0",
  app: "/Users/ambreenkhan/ambysan/LearningGrid/Automation/mobile-development/scriptlab/ios/build/Build/Products/Debug-iphonesimulator/scriptlab.app",
  automationName: "XCUITest"
}
```

---

## 🚀 **2️⃣ For real iOS devices (physical)**

You’ll need an **`.ipa`** file.

### 🧭 **Build it**

From Xcode:

1. Open `ios/scriptlab.xcworkspace`.
2. Select your **device** (not simulator) at the top.
3. In the menu: **Product → Archive**.
4. When it’s done, open **Organizer** → **Distribute App** → choose **Ad Hoc** or **Development**.
5. Xcode will generate a file like:

   ```
   ~/Library/Developer/Xcode/Archives/<date>/scriptlab <timestamp>.xcarchive
   ```
6. Inside that archive, you’ll find your `.ipa`.

You can also export it via terminal using:

```bash
xcodebuild -exportArchive \
  -archivePath ~/Library/Developer/Xcode/Archives/<DATE>/scriptlab.xcarchive \
  -exportOptionsPlist ExportOptions.plist \
  -exportPath ./build
```

You’ll get:

```
ios/build/scriptlab.ipa
```

### ⚙️ Use in Appium (real device)

```js
{
  platformName: "iOS",
  deviceName: "iPhone 14 Pro",
  platformVersion: "17.0",
  app: "/path/to/scriptlab.ipa",
  automationName: "XCUITest",
  udid: "<your-device-udid>",
  xcodeOrgId: "<your-team-id>",
  xcodeSigningId: "iPhone Developer"
}
```

---

### 💡 Quick summary

| Platform      | Build Command                                                              | Output          | Appium “app” path                                              |
| ------------- | -------------------------------------------------------------------------- | --------------- | -------------------------------------------------------------- |
| Android       | `./gradlew assembleDebug`                                                  | `app-debug.apk` | `android/app/build/outputs/apk/debug/app-debug.apk`            |
| iOS Simulator | `xcodebuild -scheme scriptlab -sdk iphonesimulator -derivedDataPath build` | `scriptlab.app` | `ios/build/Build/Products/Debug-iphonesimulator/scriptlab.app` |
| iOS Device    | Archive via Xcode                                                          | `scriptlab.ipa` | `ios/build/scriptlab.ipa`                                      |

---



