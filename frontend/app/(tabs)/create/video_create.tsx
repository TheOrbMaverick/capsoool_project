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
import Recipients from "@/components/Recipients";
import { DataContext } from "@/components/contexts/DataContext";
// import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useContext(UserContext);
  const [uploading, setUploading] = useState(false);
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);

  const { allData } = useContext(DataContext);
  const [texts, trusted, video, image, recipient] = allData || [[], [], [], [], []];

  const [form, setForm] = useState({
    id: 0,
    title: '',
    recipient: '',
    thumbnail: null,
    video: null
  });

  const openPicker = () => {
    Alert.alert(
      'Add Video or Image',
      'Pick from your gallery or record using your camera',
      [
          {
              text: 'Select Media',
              onPress: () => console.log('Open image'),
              style: 'default'
          },
          {
              text: 'Camera',
              onPress: () => router.push('/camera'),
              style: 'default'
          }
      ]
    );
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

        <Text className='mt-10 text-base text-gray-100 font-pmedium'>Recipients:</Text>
        <Recipients recipient={recipient}/>

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
