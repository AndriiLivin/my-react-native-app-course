import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

interface ICustomButton {
  title: string;
  handlPress: () => void;
  containerStyles: { marginTop: number; [key: string]: any };
  textStyles: {
    // дополнительные пока неизвестные ключи
    // используется не часто
    [key: string]: any;
  };
  isLoading: boolean;
}

// interface IUnknown {
//   // дополнительные пока неизвестные ключи
//   // используется не часто
//   [key: string]: string | number | boolean;
// }

const CustomButton = ({
  title,
  handlPress,
  containerStyles,
  textStyles,
  isLoading,
}: ICustomButton) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <>
      <Pressable
        onPress={handlPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        // activeOpacity={0.7}
        style={Object.assign(containerStyles, styles.opacity, {
          opacity: isLoading ? 50 : 100,
          backgroundColor: isPressed ? "rgba(255, 140, 0, 0.7)" : "#FF8C00",
        })}
        disabled={isLoading}
      >
        <Text style={Object.assign(styles.text, textStyles)}>{title}</Text>
      </Pressable>
    </>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  opacity: {
    backgroundColor: "#FF8C00",
    borderRadius: 8,
    minHeight: 62,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
    lineHeight: 22.4,
    color: "#161622",
    fontWeight: 600,
    textAlign: "center",
  },
});
