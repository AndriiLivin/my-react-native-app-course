// import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      

{/* добавить mode='modal' в layout.jsx (auth) <Stack.Navigator mode="modal"> он говорит, что он устарел, но он работает, рекомендуемое presentation='modal' у меня не работает */}
      <Stack>
        <Stack.Screen name="sing-in" options={{ headerShown: false }} />
        <Stack.Screen name="sing-up" options={{ headerShown: false }} />
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
      {/* <Text>AuthLayout</Text> */}
    </>
  );
};

export default AuthLayout;

// const styles = StyleSheet.create({});
