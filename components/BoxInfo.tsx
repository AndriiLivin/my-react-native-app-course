import { View, Text } from "react-native";
import React from "react";

const BoxInfo = ({ title, subtitle, containerStyles, titleStyles }: any) => {

  return (
    <View style={containerStyles}>
      <Text
        style={Object.assign(titleStyles, {
          color: "white",
          textAlign: "center",
          fontFamily: "PoppinsSemiBold",
        })}
      >
        {title}
      </Text>
      <Text style={{ color: "#7B7B8B",textAlign:"center",fontFamily:"PoppinsRegular" }}>{subtitle}</Text>
    </View>
  );
};

export default BoxInfo;
