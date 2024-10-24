import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    // creator: { username, avatar },
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
              source={{ uri: thumbnail }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                resizeMode: "cover",
              }}
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
              UserName maybe
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
              resizeMode: "contain",
            }}
          />
        </View>
      </View>
      <View>
        {/* открываем динамический блок кода */}
        {play ? (
          <Text style={{ color: "white",textAlign:"center" }}> Playing</Text>
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
                resizeMode: "cover",
              }}
            />
            <Image
              source={icons.play}
              style={{
                position: "absolute",
                width: 36,
                height: 36,
                resizeMode: "contain",
              }}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default VideoCard;
