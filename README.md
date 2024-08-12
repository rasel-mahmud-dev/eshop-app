This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

 ## Build 

```shell
cd android
./gradlew clean
./gradlew assembleRelease

```

Now find this apk on
```shell
/android/app/build/outputs/apk/release/app-release.apk
```

## Clear cache
```shell
npx react-native start --reset-cache

cd android && ./gradlew clean
```


```shell
emulator -list-avds
emulator -avd Pixel_3a_XL_API_31
emulator -avd Pixel_7_API_33
emulator -avd Pixel_Fold_API_33

emulator -avd Pixel_8_Pro_API_33
emulator -avd Pixel_6_API_33
```


### Gradle clean

```shell
cd android 
gradlew clean
npx react-native start --reset-cache
```
