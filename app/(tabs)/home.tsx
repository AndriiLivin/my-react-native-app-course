import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  // StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";

const Home = () => {
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // т.к. нельзя использовать async внутри useEffect
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       // получаем все сообщения в веотикальном положении
  //       const response:any = await getAllPosts();
  //       setData(response);
  //     } catch (error: any) {
  //       Alert.alert("Error", error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // console.log(data);
  // извлекаем данные из прользовательского хука
  // и переименовываем в posts
  const { data: posts, refetch } = useAppwrite(getAllPosts);

  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // re call videos -> if any new  videos appeard
    // refetch нужно когда прокручиваем страницу вниз или проводим пальцем по экрану вниз(дергаем верхний край)
    // ждем повторной выборки
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
      <FlatList
        // data={[
        //   { id: 1, $id: "1" },
        //   { id: 2, $id: "2" },
        //   { id: 3, $id: "3" },
        // ]}
        // data={[]}
        data={posts}
        keyExtractor={(item: any) => item.$id}
        renderItem={({ item }) => (
          <>
            <VideoCard video={item} />
          </>
        )}
        ListHeaderComponent={() => (
          <View
            style={{
              marginVertical: 32,
              paddingHorizontal: 16,
              gap: 10,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <View>
                <Text
                  style={{
                    color: "#CDCDE0",
                    fontFamily: "PoppinsMedium",
                    fontSize: 14,
                  }}
                >
                  Welcome back
                </Text>
                <Text
                  style={{
                    color: "#CDCDE0",
                    fontFamily: "PoppinsSemiBold",
                    fontSize: 24,
                  }}
                >
                  LAI
                </Text>
              </View>
              <View
                style={{
                  marginTop: 6,
                }}
              >
                <Image
                  source={images.logoSmall}
                  style={{ width: 30, height: 34 }}
                  resizeMode={"contain"}
                />
              </View>
            </View>
            {/* поле поиска */}
            <SearchInput />
            <View
              style={{
                flex: 1,
                width: "100%",
                paddingTop: 12,
                paddingBottom: 12,
              }}
            >
              <Text
                style={{
                  color: "#CDCDE0",
                  fontSize: 14,
                  fontFamily: "PoppinsRegular",
                  marginBottom: 16,
                }}
              >
                Latest Videos
              </Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
