import { View, Text, FlatList } from "react-native";
import React from "react";

const Trending = ({ posts }: any) => {
  // console.log(posts);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <Text style={{ fontSize: 24, fontWeight: 700, color: "#CDCDE0" }}>
          {item.id}
        </Text>
      )}
      horizontal
    />
  );
};

export default Trending;
