import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

interface ICustomButton {
  title: string;
  handlPress: () => void;
  containerStyles: { marginTop: number; [key: string]: any;};
  textStyles: {
    // дополнительные пока неизвестные ключи
    // используется не часто
    [key: string]: any;
  };
  isLoading: boolean;
}

interface IUnknown {
  // дополнительные пока неизвестные ключи
  // используется не часто
  [key: string]: string | number | boolean;
}

const CustomButton = ({
  title,
  handlPress,
  containerStyles,
  textStyles,
  isLoading,
}: ICustomButton) => {
  //  разработчик должен явно писать any, если по каким-то причинам не получается правильно описать тип переменной или если указание типа переменной приводит к ошибкам в другом участке кода
  const styleSum: any = Object.assign(containerStyles, styles.opacity, {
    opacity: isLoading ? 50 : 100,
  });

  return (
    <TouchableOpacity
      onPress={handlPress}
      activeOpacity={0.7}
      style={styleSum}
      disabled={isLoading}
    >
      <Text style={Object.assign(styles.text, textStyles)}>{title}</Text>
    </TouchableOpacity>
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
