import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import ImageCapsoool from '@/components/ImageCapsoool'
import { DataContext, ImageData } from '@/components/contexts/DataContext'
import EmptyState from '@/components/EmptyState'
import { UserContext } from '@/components/contexts/UserContext'

const Images = () => {
  const { user } = useContext(UserContext);
  const { allData } = useContext(DataContext);

  const [texts, trustedPersons, videos, images, recipients] = allData || [[], [], [], [], []];

  // State hooks
  const [imageData, setImageData] = useState<ImageData[]>();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setImageData(images);
    setIsLoading(false);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView className='bg-primary h-full' edges={['right', 'left', 'bottom']}>
      <FlatList
        data={imageData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: ImageData }) => (
          <ImageCapsoool 
            id={item.id}
            filename={item.filename}
            filepath={item.filepath}
            recipients={item.recipients}
            created_at={item.created_at}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Create your first capsoool"
            subtitle="No capsoools yet"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Images