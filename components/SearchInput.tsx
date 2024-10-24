import {
  Image,
  // StyleSheet,
  Text,
  TextInput,
  // TouchableOpacity,
  // вместо него
  Pressable,
  View,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

interface IAny {
  // дополнительные пока неизвестные ключи
  // используется не часто
  [key: string]: any;
}

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: IAny) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    // <View style={Object.assign({ rowGap: 1 }, otherStyles)}>

    <View
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#1E1e2D",
        borderWidth: 3,
        borderRadius: 8,
        borderColor: isActive ? "#FFA300" : "#000000",
        width: `100%`,
        height: 64,

        alignItems: "center",
      }}
    >
      <TextInput
        style={{
          flex: 1,
          width: `100%`,
          height: `100%`,
          borderRadius: 8,
          fontFamily: "PoppinsRegular",
          color: "#CDCDE0",
          fontSize: 16,
          fontWeight: 400,
          lineHeight: 22.4,
          paddingLeft: 10,
        }}
        value={value}
        placeholder={"Search for a video topic"}
        placeholderTextColor="#7B7B8B"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
      />
      {/* по сути <TouchableOpacity> - <Pressable является кнопкой */}
      <Pressable>
        <Image
          source={icons.search}
          style={{
            height: 16,
            width: 16,
            resizeMode: "contain",
            position: "absolute",
            bottom: -9,
            right: 12,
          }}
        />
      </Pressable>
    </View>
  );
};

export default SearchInput;
