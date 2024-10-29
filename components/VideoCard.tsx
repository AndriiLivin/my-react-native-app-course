import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    // creator: { username, avatar },
    creator,
  },
}: any) => {
  // определяем воспроизводится ли видео
  const [play, setPlay] = useState(false);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        paddingHorizontal: 12,
        marginBottom: 32,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 46,
              height: 46,
              borderWidth: 2,
              borderRadius: 8,
              borderColor: "#FF8C00",
              justifyContent: "center",
              alignItems: "center",
              // padding: 2,
            }}
          >
            <Image
              // source={creator.avatar}
              source={{ uri: "../assets/images/professional-business.jpg" }}
              // source={{uri: "../assets/video/tQN.gif" }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius:8,
                justifyContent: "center",
                alignItems: "center",
              }}
              resizeMode={"cover"}
            />
          </View>
          <View
            style={{
              flex: 1,
              marginLeft: 10,
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: 600, color: "white" }}
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              style={{ fontSize: 14, fontWeight: 400, color: "#CDCDE0" }}
              numberOfLines={1}
            >
              {creator.username}
            </Text>
          </View>
        </View>
        <View style={{ paddingTop: 10 }}>
          <Image
            source={icons.menu}
            style={{
              width: 20,
              height: 20,

              justifyContent: "center",
              alignItems: "center",
            }}
            resizeMode={"contain"}
          />
        </View>
      </View>
      <View>
        {/* открываем динамический блок кода */}
        {play ? (
          // <Text style={{ color: "white",textAlign:"center" }}> Playing</Text>

          <Video
            source={{
              // uri: "../assets/video/sill_1280x720.mp4",
              uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
              // uri: "../assets/video/tQN.gif",
              // uri: video,
            }}
            style={{
              width: "100%",
              height: 200,
              // width: 190,
              // height: 285,
              borderRadius: 15,
              // overflow: "hidden",
              marginVertical: 16,
              // marginLeft: 16,
              // backgroundColor: "grey",
            }}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status: any) => {
              if (status.didJustFinish) {
                setPlay(false);
              }
            }}
          />
        ) : (
          <Pressable
            //  onHoverIn={}
            onPress={() => setPlay(true)}
            style={{
              width: "100%",
              height: 200,
              marginTop: 10,
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: thumbnail }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 15,
              }}
              resizeMode={"cover"}
            />
            <Image
              source={icons.play}
              style={{
                position: "absolute",
                width: 36,
                height: 36,
              }}
              resizeMode={"contain"}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default VideoCard;
