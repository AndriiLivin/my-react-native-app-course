import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import React, { useRef, useState } from "react";

import { icons } from "@/constants";
import { video } from "@/constants";

import * as Animatable from "react-native-animatable";

import { ResizeMode, Video } from "expo-av";

const zoomIn = {
  0: { scale: 0.8 },
  1: { scale: 1.0 },
} as Animatable.CustomAnimation;
// пришлось дополнить  as Animatable.CustomAnimation
const zoomOut = {
  0: { scale: 1.0 },
  1: { scale: 0.8 },
} as Animatable.CustomAnimation;

const TrendingItem = ({ activeItem, item }: any) => {
  const [play, setPlay] = useState(false);

  // console.  log(item.video);

  return (
    // возвращает представление, кот позволяет создавать анимацию внутри него
    <Animatable.View
      // animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      // animation={zoomOut}
      duration={500}
      style={{ marginRight: 16 }}
    >
      {play ? (
        <Video
          source={{
            // uri: "../assets/video/sill_1280x720.mp4",
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            // uri: "../assets/video/tQN.gif",
            // uri: item.video,
          }}
          style={{
            width: 190,
            height: 285,
            borderRadius: 15,
            // overflow: "hidden",
            marginVertical: 16,
            marginLeft: 16,

            backgroundColor: "grey",
            // shadowColor: "grey",
            // shadowRadius: 20,
            // shadowOffset:{width:10, height: 20}
          }}
          resizeMode={ResizeMode.STRETCH}
          // useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status: any) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
          // status(failed) net:: ERR_BLOCKED_BY_ORB
        />
      ) : (
        <Pressable
          //  onHoverIn={}
          onPress={() => setPlay(true)}
          style={{
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            style={{
              width: 190,
              height: 285,
              borderRadius: 15,
              overflow: "hidden",
              marginVertical: 16,
              marginLeft: 16,

              // shadowColor: "grey",
              // shadowRadius: 20,
              // shadowOffset:{width:10, height: 20}
            }}
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            style={{
              position: "absolute",
              width: 36,
              height: 36,
            }}
            resizeMode="contain"
          />
        </Pressable>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: any) => {
  // console.log(posts);

  const [activeItem, setActiveItem] = useState(posts[1]);

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    // console.log(viewableItems);

    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 70,
  };
  // добавлено
  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      // onViewableItemsChanged={viewableItemsChanged}
      // заменить на
      // viewabilityConfig={{
      //   itemVisiblePercentThreshold: 70,
      // }}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      contentOffset={{ x: 170, y: 10 }}
      horizontal
    />
  );
};

export default Trending;
