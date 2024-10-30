import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { Video, ResizeMode } from "expo-av";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<any>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType) => {
    // выбор режима
    const result =await DocumentPicker
  };

  const submit = async () => {
    // if (form.password === "" || form.email === "") {
    //   Alert.alert("Error", "Please fill in all fields");
    //   alert("Please fill in all fields");
    // }
    // setIsSubmitting(true);
    // try {
    //   // входим в систему
    //   await singIn(form.email, form.password);
    //   const result = await getCurrentUser();
    //   // set it to global state....
    //   setUser(result);
    //   setIsLoggedIn(true);
    //   Alert.alert("Success", "User sined in successfully");
    //   // alert("User sined in successfully");
    //   router.replace("/home");
    //   //
    // } catch (error: any) {
    //   Alert.alert("Error", "Не получается регистрация" + error.message);
    //   //  console.log("предупреждаю" + error.message);
    //   alert("Не получается регистрация");
    // } finally {
    //   setIsSubmitting(false);
    // }
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
          <Pressable onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                style={{
                  width: "100%",
                  height: 150,
                  borderRadius: 8,
                }}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
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
                resizeMode="cover"
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
