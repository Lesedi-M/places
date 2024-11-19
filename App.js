import { View, Text, StatusBar, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import * as Location from "expo-location";
import LoginScreen from "./App/Screen/LoginScreen/LoginScreen";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./App/Navigation/TabNavigation";
import { UserLocationContext } from "./App/Context/UserLocationContext";
import 'react-native-get-random-values';


SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const App = () => {
  const [fontsLoaded] = useFonts({
    serrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    "serrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "serrat-semibold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(location.coords);
      console.log(location)
    }

    getCurrentLocation();
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const publishableKey =
    "pk_test_bWVycnktc2hlcGhlcmQtNDIuY2xlcmsuYWNjb3VudHMuZGV2JA";

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <UserLocationContext.Provider 
        value={{location,setLocation}}
      >
        <StatusBar hidden="true"/>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <SignedIn>
            <NavigationContainer>
              <TabNavigation />
            </NavigationContainer>
          </SignedIn>
          <SignedOut>
            <LoginScreen />
          </SignedOut>
        </View>
      </UserLocationContext.Provider>
    </ClerkProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 50,
  },
});

export default App;
