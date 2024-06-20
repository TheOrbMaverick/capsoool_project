import { useContext, useState } from "react";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { UserContext } from "@/components/contexts/UserContext";
import { router } from "expo-router";
// import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useContext(UserContext);
  const [uploading, setUploading] = useState(false);
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);

  const [form, setForm] = useState({
    id: 0,
    title: '',
    recipient: '',
    thumbnail: null,
    video: null
  });

  const openPicker = () => {
    router.push('create/camera')
  }

  // const openPicker = async () => {
  //   const result = await DocumentPicker.getDocumentAsync({
  //     type: ['image/*', 'video/*'],
  //   });

  //   if (!result.canceled) {

  //   }

  //   // if (result.type === 'success') {
  //   //   const { uri, mimeType } = result;
  //   //   setMediaUri(uri);
  //   //   if (mimeType.startsWith('image/')) {
  //   //     setMediaType('image');
  //   //   } else if (mimeType.startsWith('video/')) {
  //   //     setMediaType('video');
  //   //   }
  //   // }
  // }

  // const openPicker = async (selectType) => {
  //   const result = await DocumentPicker.getDocumentAsync({
  //     type:
  //       selectType === "image"
  //         ? ["image/png", "image/jpg"]
  //         : ["video/mp4", "video/gif"],
  //   });

  //   if (!result.canceled) {
  //     if (selectType === "image") {
  //       setForm({
  //         ...form,
  //         thumbnail: result.assets[0],
  //       });
  //     }

  //     if (selectType === "video") {
  //       setForm({
  //         ...form,
  //         video: result.assets[0],
  //       });
  //     }
  //   } else {
  //     setTimeout(() => {
  //       Alert.alert("Document picked", JSON.stringify(result, null, 2));
  //     }, 100);
  //   }
  // };

  // const submit = async () => {
  //   if (
  //     (form.prompt === "") |
  //     (form.title === "") |
  //     !form.thumbnail |
  //     !form.video
  //   ) {
  //     return Alert.alert("Please provide all fields");
  //   }

  //   setUploading(true);
  //   try {
  //     await createVideoPost({
  //       ...form,
  //       userId: user.$id,
  //     });

  //     Alert.alert("Success", "Post uploaded successfully");
  //     router.push("/home");
  //   } catch (error) {
  //     Alert.alert("Error", error.message);
  //   } finally {
  //     setForm({
  //       title: "",
  //       video: null,
  //       thumbnail: null,
  //       prompt: "",
  //     });

  //     setUploading(false);
  //   }
  // };

  return (
    <SafeAreaView className="bg-primary h-full" edges={['right', 'left']}>
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Media</Text>

        <FormField
          title="Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video or Image
          </Text>

          <TouchableOpacity onPress={() => openPicker()}>
            {form.video ? (
              <Video
                source={{ uri: 'form.video.uri' }}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => console.log('Video')}>
            {form.thumbnail ? (
              <Image
                source={{ uri: 'form.thumbnail.uri' }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="Recipients"
          value={form.recipient}
          placeholder="The AI prompt of your video...."
          handleChangeText={(e) => setForm({ ...form, recipient: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={() => {console.log('press')}}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
