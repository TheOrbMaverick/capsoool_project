import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { CameraType } from 'expo-camera/legacy';
import { useEffect, useState } from 'react';
import { Alert, Button, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState(CameraType.back);
  const [permission, requestPermission] = useCameraPermissions();
  const [micon, requestMicOn] = useMicrophonePermissions()
	
	useEffect(() => {
		requestPermission
		requestMicOn
	}, [])
  
	if (!permission?.granted) {
		// Camera permissions are not granted yet.
		return (
			<SafeAreaView className='bg-primary h-full'>
				<View className='flex-1 justify-center items-center'>
				<Text className='text-white'>We need your permission to show the camera</Text>
				<Button onPress={requestPermission} title="grant permission" />
				</View>
			</SafeAreaView>
		)
	}

  function toggleCameraFacing() {
    setFacing(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <CameraView className='h-full' facing={facing}>
        <View className=''>
          <TouchableOpacity className='' onPress={toggleCameraFacing}>
            <Text className='text-white'>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </SafeAreaView>

  );
}
