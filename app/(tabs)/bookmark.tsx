import { StyleSheet, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Bookmark = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
      <ScrollView style={{ paddingHorizontal: 12, marginTop: 22 }}></ScrollView>
      <Text
        style={{
          color: "#FFFFFF",
          fontFamily: "PoppinsSemiBold",
          fontSize: 22,
        }}
      >
        Bookmark
      </Text>
      <ScrollView />
    </SafeAreaView>
  );
};

export default Bookmark;

const styles = StyleSheet.create({});
