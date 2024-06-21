import React, { useEffect, useRef, useState } from 'react';
import { Alert, Linking, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera/legacy';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [facing, setFacing] = useState(CameraType.back);
  const [cameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
  const [audioPermission, requestAudioPermission] = Camera.useMicrophonePermissions();
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef<Camera | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  useEffect(() => {
    async function requestPermissions() {
      await requestCameraPermission();
      await requestAudioPermission();
    }
    requestPermissions();
  }, []);

  if (!cameraPermission || !audioPermission) {
    return <View />;
  }

  if (!cameraPermission.granted || !audioPermission.granted) {
    return (
      Alert.alert(
        "Permission Required",
        "This app needs access to your camera and microphone. Please go to settings and enable permissions.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() }
        ]
      )
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const savedUri = `${FileSystem.documentDirectory}photos/${Date.now()}.jpg`;
      await FileSystem.moveAsync({
        from: photo.uri,
        to: savedUri,
      });
      setPhotoUri(savedUri);
      console.log(savedUri);
    }
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      // Handle the selected image or video here
    }
  };

  const closeCamera = () => {
    router.back()
  };

  const handleRecordVideo = async () => {
    if (isRecording) {
      if (cameraRef.current) {
        cameraRef.current.stopRecording();
      }
    } else {
      setIsRecording(true);
      if (cameraRef.current) {
        const video = await cameraRef.current.recordAsync();
        console.log(video.uri);
      }
      setIsRecording(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Camera
        style={{ flex: 1 }}
        type={facing}
        ref={cameraRef}
      >
        <View className="flex-1 justify-center">
          <View className="absolute top-0 left-0 right-0 z-10 flex-row justify-start p-4">
            <TouchableOpacity onPress={closeCamera}>
              <MaterialIcons name="close" size={36} color="white" />
            </TouchableOpacity>
          </View>
          <View className="flex-1 flex-row bg-transparent mb-8">
            <TouchableOpacity className="flex-1 self-end items-center" onPress={openGallery}>
              <MaterialIcons name="photo-library" size={36} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 self-end items-center" onPress={takePicture} onLongPress={handleRecordVideo}>
              <View className="bg-white w-[48px] h-[48px] rounded-xl"></View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 self-end items-center" onPress={toggleCameraFacing}>
              <MaterialIcons name="flip-camera-ios" size={36} color="white" />
            </TouchableOpacity>
          </View>
          <View className='flex-row justify-center mb-4'>
            <Text className='text-xl font-psemibold text-white pr-8'>VIDEO</Text>
            <Text className='text-xl font-psemibold text-white pl-8'>IMAGE</Text>
          </View>
        </View>
      </Camera>
    </SafeAreaView>
  );
}
