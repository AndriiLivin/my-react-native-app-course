import { FlatList, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";

import { searchPosts } from "@/lib/appwrite";

import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  // извлекаем данные из прользовательского хука
  // и переименовываем в posts
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View
            style={{
              marginVertical: 32,
              paddingHorizontal: 16,
              // gap: 10,
            }}
          >
            <Text
              style={{
                color: "#CDCDE0",
                fontFamily: "PoppinsMedium",
                fontSize: 14,
              }}
            >
              Search Results
            </Text>
            <Text
              style={{
                color: "#CDCDE0",
                fontFamily: "PoppinsSemiBold",
                fontSize: 24,
              }}
            >
              {query}
            </Text>

            <View style={{ marginTop: 6, marginBottom: 8 }}>
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
