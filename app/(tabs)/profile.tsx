import { StyleSheet, Text, View } from "react-native";
import React from "react";
// rnfes - снипет

const Profile = () => {
  return (
    <>
      <Text style={styles.text}>Header</Text>
      <View style={styles.container}>
        <Text style={styles.text}>Profile</Text>
      </View>
      <Text style={styles.text}>Footer</Text>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "maroon",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 33,
    fontWeight: 700,
  },
});
