import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, singIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SingIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn }: any = useGlobalContext();

  const submit = async () => {
    if (form.password === "" || form.email === "") {
      Alert.alert("Error", "Please fill in all fields");
      alert("Please fill in all fields");
    }
    setIsSubmitting(true);

    try {
      // входим в систему
      await singIn(form.email, form.password);
      const result = await getCurrentUser();
      // set it to global state....
      setUser(result);
      setIsLoggedIn(true);

      Alert.alert("Success", "User sined in successfully");
      alert("User sined in successfully");
      router.replace("/home");
      //
    } catch (error: any) {
      Alert.alert("Error", "предупреждаю" + error.message);
      //  console.log("предупреждаю" + error.message);

      alert("предупреждаю");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: `100%` }}>
      {/* <ScrollView contentContainerStyle={{ height: `100%` }}> */}
      <ScrollView
        contentContainerStyle={{
          height: `100%`,
          width: `100%`,
        }}
      >
        <View
          style={{
            display: "flex",
            // flex: 1,
            // height: `100%`,
            minHeight: `95%`,
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
          <CustomButton
            title="Sing In"
            handlPress={submit}
            containerStyles={{ width: `100%`, marginTop: 30 }}
            textStyles={{}}
            isLoading={isSubmitting}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 8,
              justifyContent: "center",
              paddingTop: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "PoppinsRegular",
                color: "#7B7B8B",
                fontSize: 18,
                lineHeight: 22.9,
                // fontWeight: 400,
                // textAlign: "center",
                // marginTop: 20,
              }}
            >
              Don't have account?
            </Text>
            <Link
              href={"/sing-up"}
              style={{
                fontFamily: "PoppinsSemiBold",
                color: "#FF8C00",
                fontSize: 18,
                lineHeight: 22.9,
              }}
            >
              Sing Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingIn;

const styles = StyleSheet.create({});
