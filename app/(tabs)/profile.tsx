import { FlatList, Image, Pressable, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";

import { getUserPosts } from "@/lib/appwrite";

import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants";
import BoxInfo from "@/components/BoxInfo";

const Profile = () => {
  const { user, setUser, setIsLoggedIn }: any = useGlobalContext();
  // const { query } = useLocalSearchParams();
  // извлекаем данные из прользовательского хука
  // и переименовываем в posts
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));
  console.log(user, posts);

  const logout = () => {};




  
  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
      <FlatList
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View
            style={{
              width: `100%`,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 16,
              marginBottom: 36,
              paddingHorizontal: 12,
            }}
          >
            <Pressable
              style={{
                width: `100%`,
                // justifyContent: "center",
                alignItems: "flex-end",
                marginBottom: 30,
              }}
              onPress={logout}
            >
              <Image
                source={icons.logout}
                style={{
                  width: 18,
                  height: 16,
                }}
                resizeMode="contain"
              />
            </Pressable>
            <View
              style={{
                width: 56,
                height: 56,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "#FF9C01",
                borderRadius: 12,
                borderWidth: 2,
                // backgroundColor:"white"
              }}
            >
              {/* <Image source={{ uri: user?.avatar }} /> */}
              <Image
                source={{ uri: "../assets/video/tQN.gif" }}
                style={{
                  width: `90%`,
                  height: `90%`,
                  borderRadius: 9,
                }}
                resizeMode="cover"
              />
            </View>
            {/* <Text style={{ color: "red" }}>{user?.username}</Text> */}
            {/* <BoxInfo title={user?.username} subtitle="GGGGGGG" /> */}

            <BoxInfo
              title={user?.username}
              subtitle=""
              containerStyles={{ marginTop: 20 }}
              titleStyles={{
                fontSize: 18,
              }}
            />

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <BoxInfo
                title={posts.length || 0}
                subtitle="Posts"
                containerStyles={{ marginRight: 33 }}
                titleStyles={{ fontSize: 20 }}
              />
              <BoxInfo
                title="1.2k"
                subtitle="Followers"
                containerStyles={{}}
                titleStyles={{ fontSize: 20 }}
              />
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

export default Profile;
