import { Image, Text, TouchableOpacity } from "react-native";
import { GLOBAL_STYLES } from "@/constants/PageStyle";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import createUserWithGoogle from "../functions/createUserWithGoogle";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleAuth({ theme, router }) {
  const redirectUri = "https://auth.expo.io/@lachezar_genov/MobileApp";
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.EXPO_PUBLIC_EXPO_GOOGLE_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_GOOGLE_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_GOOGLE_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    selectAccount: true,
    scopes: [
      "https://www.googleapis.com/auth/calendar.readonly",
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
    redirectUri: makeRedirectUri({ useProxy: true }),
  });

  useEffect(() => {
    console.log(response);
    console.log(process.env.EXPO_PUBLIC_EXPO_GOOGLE_CLIENT_ID);
    console.log("Redirect URI:", makeRedirectUri({ useProxy: true }));
    handleSignIn();
  }, [response]);

  //Handles the sign in request
  async function handleSignIn() {
    //Finds the user in the Async storage
    const user = await AsyncStorage.getItem("@user");
    //If user not found, it means no user has logged in
    if (!user) {
      if (response?.type === "success") {
        setToken(response.authentication.accessToken);
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  //Function that gets information about the user
  async function getUserInfo(token) {
    if (!token) return;
    try {
      const response = await axios.get(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      const user = response.data;

      //await AsyncStorage.setItem("@user", JSON.stringify(user));
      await AsyncStorage.setItem("@token", token);
      setUserInfo(user);

      //Creates the user and authenticates him
      await createUserWithGoogle(token);

      //Navigates to the home page
      router.push("/home/dailyTasks");
    } catch (err) {
      console.error(err);
    }
  }

  console.log("USER INFO:");
  console.log(userInfo);

  return (
    <TouchableOpacity
      style={{
        ...GLOBAL_STYLES.buttonStyle,
        borderColor: theme.accent,
        backgroundColor: theme.background,
      }}
      onPress={() => {
        promptAsync({ useProxy: true });
      }}
    >
      <Text style={{ ...GLOBAL_STYLES.buttonText, color: theme.text }}>
        Google
      </Text>
      <Image
        style={{ width: 30, height: 30 }}
        source={require("../assets/images/Google__G__logo.svg.png")}
      />
    </TouchableOpacity>
  );
}
