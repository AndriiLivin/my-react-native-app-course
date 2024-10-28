import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }: any) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 12,
      }}
    >
      <Image
        source={images.empty}
        style={{
          width: 270,
          height: 215,
        }}
        resizeMode={"contain"}
      />
      <Text
        style={{
          color: "#CDCDE0",
          fontFamily: "PoppinsSemiBold",
          fontSize: 18,
          marginTop: 6,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: "#CDCDE0",
          fontFamily: "PoppinsMedium",
          fontSize: 14,
        }}
      >
        {subtitle}
      </Text>
      <CustomButton
        title="Create video"
        handlPress={() => router.push("/create")}
        containerStyles={{ width: `100%`, marginTop: 16 }}
        textStyles={{}}
        isLoading={false}
      />
    </View>
  );
};

export default EmptyState;
