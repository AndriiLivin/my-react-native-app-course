import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SingUp = () => {
  const { setUser, setIsLoggedIn }: any = useGlobalContext();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.username === "" || form.password === "" || form.email === "") {
      Alert.alert("Error", "Please fill in all fields");
      // alert("Please fill in all fields");
    }
    setIsSubmitting(true);

    try {
      // создание пользователя
      const result = await createUser(form.email, form.password, form.username);
      // set it to global state....
      setUser(result);
      setIsLoggedIn(true);

      // console.log("перенаправление");
      router.replace("/home");
      //
    } catch (error: any) {
      Alert.alert("Error", "предупреждаю" + error.message);
      // console.log("предупреждаю" + error.message);

      alert("не получается создать запись");
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
            Sing up to Aora
          </Text>
          <FormField
            title="User name"
            value={form.username}
            handleChangeText={(e: any) => setForm({ ...form, username: e })}
            otherStyles={{ width: `100%`, marginTop: 30 }}
          />
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
            title="Sing Up"
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
              Already have an account?
            </Text>
            <Link
              href={"/sing-in"}
              style={{
                fontFamily: "PoppinsSemiBold",
                color: "#FF8C00",
                fontSize: 18,
                lineHeight: 22.9,
              }}
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingUp;

const styles = StyleSheet.create({});
