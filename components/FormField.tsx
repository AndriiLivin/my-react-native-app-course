import {
  Image,
  StyleSheet,
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

const FormField = ({
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
    <View style={Object.assign({ rowGap: 1 }, otherStyles)}>
      <Text
        style={{
          fontFamily: "PoppinsMedium",
          color: "#7B7B8B",
          fontSize: 18,
          lineHeight: 22.9,
          // fontWeight: 400,
          // textAlign: "center",
          // marginTop: 20,
        }}
      >
        {title}
      </Text>
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
          // justifyContent: "center",
          alignItems: "center",
          // paddingLeft: 10,
          // paddingRight: 10,
          // marginTop: 20,
        }}
        // focusable
      >
        <TextInput
          style={{
            flex: 1,
            width: `100%`,
            height: `100%`,
            borderRadius: 8,
            fontFamily: "PoppinsSemiBold",
            color: "#FFA300",
            fontSize: 18,
            lineHeight: 22.9,
            paddingLeft:10,
            // fontWeight: 400,
            // textAlign: "center",
            // marginTop: 20,
          }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {/* по сути <TouchableOpacity> - <Pressable является кнопкой */}
        {title === "Password" && (
          // <TouchableOpacity
          <Pressable
            // переключатель глаза
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              resizeMode="contain"
              style={{
                height: 24,
                width: 24,
                // marginRight:12,
                position: "absolute",
                bottom: -12,
                right: 12,
              }}
            />
          </Pressable>
        )}

      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({});
