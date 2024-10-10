import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Link } from "expo-router";

// это домашняя страница или прямая косая черта /
// А подчеркивание будет присутствовать на всех маршрутах _layaut.tsx
export default function Index() {
  return (
    // NativeWind extends the React Native types via declaration merging. The simplest method to include the types is to create a new nativewind-env.d.ts file and add a triple-slash directive referencing the types.
    // /// <reference types="nativewind/types" />
    <View style={styles.container}>
      <Text style={styles.text}>Я это опять сделал.</Text>
      <StatusBar style="auto" />
      <Link href={"/profile"} style={{ color: "blue" }}>
        Go to Profile
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 33,
    fontWeight: 700,
  },
});
