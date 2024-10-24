import { Text, View, ScrollView, Image } from "react-native";

import { Redirect, router } from "expo-router";
// import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";

import { useGlobalContext } from "@/context/GlobalProvider";

// это домашняя страница или прямая косая черта /
// А подчеркивание будет присутствовать на всех маршрутах _layaut.tsx
export default function Index() {
  const { isLoading, isLoggedIn }:any = useGlobalContext();

  // console.log(isLoading, isLoggedIn);
  
if (!isLoading && isLoggedIn) return <Redirect href="/home" /> 

  return (
    // NativeWind extends the React Native types via declaration merging. The simplest method to include the types is to create a new nativewind-env.d.ts file and add a triple-slash directive referencing the types.
    // /// <reference types="nativewind/types" />
    <SafeAreaView style={{ backgroundColor: "#161622", height: `100%` }}>
      {/* весь экран доступен для прокрутки это важно для маленьких устройств, */}
      {/* где не влазит весь контент */}
      <ScrollView contentContainerStyle={{ height: `100%` }}>
        <View
          style={{
            flex: 1,
            minHeight: `95%`,
            width: `100%`,
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{ height: 84, width: 130 }}
          />
          <Image
            source={images.cards}
            resizeMode="contain"
            style={{ height: 300, width: `100%`, maxWidth: 380 }}
          />
          <View style={{ position: "relative", marginTop: 5 }}>
            <Text
              style={{
                color: "white",
                fontSize: 30,
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Discover Endless Possibilities with{" "}
              <Text
                style={{
                  color: "#FF8E01",
                }}
              >
                Aora
              </Text>
            </Text>
            <Image
              source={images.path}
              resizeMode="contain"
              style={{
                height: 15,
                width: 136,
                position: "absolute",
                bottom: -8,
                right: 0,
              }}
            />
          </View>
          <Text
            style={{
              fontFamily: "PoppinsRegular",
              color: "#CDCDE0",
              fontSize: 14,
              lineHeight: 22.4,
              fontWeight: 400,
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
          <CustomButton
            title="Continue with Email"
            handlPress={() => router.push("/sing-in")}
            containerStyles={{ width: `100%`, marginTop: 30 }}
            textStyles={{}}
            isLoading={false}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
