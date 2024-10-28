import {
  Image,
  // StyleSheet,
  Text,
  TextInput,
  // TouchableOpacity,
  // вместо него
  Pressable,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";


// const SearchInput = ({
//   title,
//   value,
//   placeholder,
//   handleChangeText,
//   otherStyles,
//   ...props
// }: IAny) => {
const SearchInput = ({ initialQuery }:any) => {
  const [isActive, setIsActive] = useState(false);

  const pathName = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (

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
        value={query}
        placeholder={"Search for a video topic"}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
        // secureTextEntry={title === "Password" && !showPassword}
      />

      <Pressable
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query.",
              "Please input something to search results across database."
            );
          }

          if (pathName.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
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
