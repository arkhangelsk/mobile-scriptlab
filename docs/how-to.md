# How to do a full clean rebuild for iOS in React Native CLI projects

## Quick Clean
```bash
cd ios
xcodebuild clean -scheme scriptlab -configuration Debug -sdk iphonesimulator
cd ..
npx react-native run-ios --simulator="iPhone 15 Pro"
```

## Full Clean:

### 🧹 **1. Close Metro Bundler and Simulator**

Make sure no build or simulator is running.

```bash
# In terminal
⌃C  (Ctrl+C)  # stop Metro bundler
```

---

### 🧽 **2. Clean iOS build cache**

From your project root:

```bash
cd ios
xcodebuild clean -scheme scriptlab -configuration Debug -sdk iphonesimulator
cd ..
```

Or if you want to be extra thorough, delete the build folder manually:

```bash
rm -rf ios/build
```

---

### 🔧 **3. Remove CocoaPods cache**

CocoaPods sometimes caches old native dependencies (like Reanimated or Gesture Handler).

Run the following commands:

```bash
cd ios
rm -rf Pods Podfile.lock
pod cache clean --all
cd ..
```

If you get permission errors, try `sudo pod cache clean --all`.

---

### 🧰 **4. Reset Metro Bundler cache**

This ensures JavaScript and Reanimated configs refresh cleanly:

```bash
npx react-native start --reset-cache
```

Keep this terminal open while running the app.

---

### 🧼 **5. Clean Xcode Derived Data (optional but powerful fix)**

Sometimes stale builds live in Xcode’s derived data folder.
You can clean it using this command:

```bash
rm -rf ~/Library/Developer/Xcode/DerivedData
```

Or via Xcode GUI:
**Xcode → Preferences → Locations → Derived Data → Delete.**

---

### 🚀 **6. Rebuild the iOS app**

Finally, run a fresh build:

```bash
npm run ios
```

Or, open the project in Xcode (`ios/YourApp.xcworkspace`) and build from there (⌘ + B).

---

## 🩺 **If you still get build errors**

Run:

```bash
cd ios
pod deintegrate
cd ..
npm run ios
```

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
or npm run ios
```

When you run: `npx react-native run-ios` or `npm run ios`, it uses Xcode’s DerivedData folder (a system-wide cache directory) to store builds. To find the `.app` file, navigate to:

```
~/Library/Developer/Xcode/DerivedData/
```
Each Xcode project gets its own folder there. 

Run this in your terminal from the project root:
```bash
find ~/Library/Developer/Xcode/DerivedData -type d -name "scriptlab.app" | grep iphonesimulator
```

You should see a path like:

```bash
/Users/ambreenkhan/Library/Developer/Xcode/DerivedData/scriptlab-asubftmirsossahdywmqreczzjgv/Build/Products/Debug-iphonesimulator/scriptlab.app
```
That’s the real app file you can use for Appium.

Once you find it, copy it to your desired location, e.g.:

```bash
cp -R "/Users/ambreenkhan/Library/Developer/Xcode/DerivedData/scriptlab-asubftmirsossahdywmqreczzjgv/Build/Products/Debug-iphonesimulator/scriptlab.app" "/Users/ambreenkhan/Downloads/scriptlab-appium-automation/apps/ios/"

```
Confirm the copy worked by running:

```bash
ls /Users/ambreenkhan/Downloads/scriptlab-appium-automation/apps/ios/scriptlab.app
```

You should see contents like:
```bash
__preview.dylib			       LaunchScreen.storyboardc
_CodeSignature			       PkgInfo
AppIcon60x60@2x.png		     PrivacyInfo.xcprivacy
AppIcon76x76@2x~ipad.png	 RCT-Folly_privacy.bundle
Assets.car			           React-Core_privacy.bundle
boost_privacy.bundle		   React-cxxreact_privacy.bundle
Frameworks			           scriptlab
glog_privacy.bundle		     scriptlab.debug.dylib
Info.plist
```

![alt text](./images/ios-app-contents.png)

If you see scriptlab (the binary file), you’re good to go!

Here’s a simple one-liner shell command you can add to your workflow (or even a small script file) that automatically finds the latest simulator build of your app and copies it into your automation repo.

```bash
cp -R "$(find ~/Library/Developer/Xcode/DerivedData -type d -name 'scriptlab.app' | grep iphonesimulator | sort -r | head -n 1)" ~/Downloads/scriptlab-appium-automation/apps/ios/
```

**What it does:**
- Finds all simulator builds of scriptlab.app in DerivedData
- Picks the latest one
- Copies it into your Appium automation folder

or Create a reusable shell script

```bash
#!/bin/bash
echo "🔍 Finding latest iOS simulator build of scriptlab.app..."
APP_PATH=$(find ~/Library/Developer/Xcode/DerivedData -type d -name "scriptlab.app" | grep iphonesimulator | sort -r | head -n 1)

if [ -z "$APP_PATH" ]; then
  echo "❌ Could not find a built scriptlab.app in DerivedData."
  exit 1
fi

DEST=~/Downloads/scriptlab-appium-automation/apps/ios/

echo "📦 Copying from:"
echo "   $APP_PATH"
echo "➡️  To:"
echo "   $DEST"

cp -R "$APP_PATH" "$DEST"

echo "✅ Done! scriptlab.app is ready in your automation folder."
```

Then make it executable once:
```bash
chmod +x copy-ios-app.sh
```

And run anytime:
```bash
./copy-ios-app.sh
``` 

### 🧩 **Use this in your Appium capabilities**

```js
{
  platformName: "iOS",
  deviceName: "iPhone 15",
  platformVersion: "17.0",
  app: "/Users/ambreenkhan/Downloads/scriptlab-appium-automation/apps/ios/scriptlab.app",
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




