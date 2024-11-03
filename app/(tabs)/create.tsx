import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { Video, ResizeMode } from "expo-av";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";

import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

import { router } from "expo-router";
import { createVideo } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const Create = () => {
  const { user }: any = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<any>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType: any) => {
    // выбор режима
    const result = await DocumentPicker.getDocumentAsync({

      type:
        selectType === "image"
          ? ["image/png", "image/jpg", "image/jpeg"]
          : ["video/mp4", "video/gif"],
    });
    console.log(result);

    // заменили на это ImagePicker
    // let result1 = await ImagePicker.launchImageLibraryAsync({
    //   // mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   // не хотим все носители
    //   selectionLimit: 1,

    //   mediaTypes:
    //     selectType === "image"
    //       ? ImagePicker.MediaTypeOptions.Images
    //       : ImagePicker.MediaTypeOptions.Videos,
    //   // allowsEditing: true,
    //   // aspect: [4, 3],

    //   videoQuality: ImagePicker.UIImagePickerControllerQualityType.High,
    //   quality: 1,
    // });
    // console.log(result1);

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
    else {
      console.log("результат отклонен");
      
    //   setTimeout(() => {}, 100);
    //   Alert.alert("Document picker", JSON.stringify(result, null, 2));
    //   alert(JSON.stringify(result, null, 2));
    }
  };

  const submit = async () => {
    if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
      // return Alert.alert("Please fill all the fields");
      return alert("Please fill all the fields");
    }
    setUploading(true);

    try {
      // пополняем в appwrite базу данных
      await createVideo({ ...form, userId: user.$id });

      Alert.alert("Success", "Post uploaded successfully");
      alert("Post uploaded successfully");
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
      <ScrollView style={{ paddingHorizontal: 12, marginTop: 22 }}>
        <Text
          style={{
            color: "#FFFFFF",
            fontFamily: "PoppinsSemiBold",
            fontSize: 22,
          }}
        >
          Upload Video
        </Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give yuor video a catch title ..."
          handleChangeText={(e: any) => setForm({ ...form, title: e })}
          otherStyles={{ width: `100%`, marginTop: 20 }}
          // keyboardType="email-address"
        />
        <View
          style={{
            marginTop: 21,
            rowGap: 10,
          }}
        >
          <Text
            style={{
              color: "grey",
              fontFamily: "PoppinsMedium",
              fontSize: 16,
            }}
          >
            Upload Video
          </Text>
          <Pressable id="uploader" onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                style={{
                  width: "100%",
                  height: 150,
                  borderRadius: 8,
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                // isLooping
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 150,
                  paddingVertical: 12,

                  justifyContent: "center",
                  alignItems: "center",

                  backgroundColor: "#1E1e2D",
                  borderWidth: 3,
                  borderColor: false ? "#FFA300" : "#000000",
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,

                    justifyContent: "center",
                    alignItems: "center",

                    borderWidth: 2,
                    borderStyle: "dashed",
                    borderColor: "#FFA300",
                    borderRadius: 6,
                  }}
                >
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    style={{
                      height: "50%",
                      width: "50%",
                    }}
                  />
                </View>
              </View>
            )}
          </Pressable>
        </View>

        <View
          style={{
            marginTop: 21,
            rowGap: 10,
          }}
        >
          <Text
            style={{
              color: "grey",
              fontFamily: "PoppinsMedium",
              fontSize: 16,
            }}
          >
            Thumbnail Image
          </Text>
          <Pressable onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="contain"
                style={{
                  width: "100%",
                  height: 150,
                  borderRadius: 8,
                }}
              />
            ) : (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",

                  width: "100%",
                  height: 58,
                  paddingVertical: 12,

                  justifyContent: "center",
                  alignItems: "center",

                  backgroundColor: "#1E1e2D",
                  borderWidth: 3,
                  borderColor: true ? "#FFA300" : "#000000",
                  borderRadius: 10,
                }}
              >
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
                <Text
                  style={{
                    marginLeft: 10,
                    color: "grey",
                    fontFamily: "PoppinsMedium",
                    fontSize: 16,
                  }}
                >
                  Choose a file ...
                </Text>
              </View>
            )}
          </Pressable>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video ..."
          handleChangeText={(e: any) => setForm({ ...form, prompt: e })}
          otherStyles={{ width: `100%`, marginTop: 30 }}
        />

        <CustomButton
          title="Submit & Publish"
          handlPress={submit}
          containerStyles={{ width: `100%`, marginTop: 26 }}
          textStyles={{}}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
