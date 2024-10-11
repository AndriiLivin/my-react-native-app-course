import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField from "@/components/FormField";

const SingIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: `100%` }}>
      {/* <ScrollView contentContainerStyle={{ height: `100%` }}> */}
      <ScrollView>
        <View
          style={{
            display: "flex",
            flex: 1,
            // height: `100%`,
            // minHeight: `95%`,
            width: `100%`,
            justifyContent: "center",
            // alignItems: "center",
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 16,
            paddingBottom: 16,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{ height: 35, width: 115 }}
          />
          <Text
            style={{
              fontFamily: "PoppinsSemiBold",
              color: "#FFFFFF",
              fontSize: 22,
              lineHeight: 31.9,
              // fontWeight: 400,
              // textAlign: "center",
              marginTop: 26,
            }}
          >
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyles={{ width: `100%`, marginTop: 20 }}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles={{ width: `100%`, marginTop: 20 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingIn;

const styles = StyleSheet.create({});
