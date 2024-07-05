import { DataContext } from '@/components/contexts/DataContext';
import EmptyState from '@/components/EmptyState';
import VideoCapsoool from '@/components/VideoCapsoool';
import { VideoData } from '@/components/contexts/DataContext';
import { UserContext } from '@/components/contexts/UserContext';
import UserInfo from '@/components/UserInfo';
import React, { useContext, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 50;

const Videos = () => {
  const { user } = useContext(UserContext);
  const { allData } = useContext(DataContext);

  const [texts, trustedPersons, videos] = allData || [[], [], [], [], []];

  // State hooks
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Form state
  const [form, setForm] = useState({
    id: '',
    title: '',
    recipient: '',
    thumbnail: '',
    video: ''
  });


  /**
   * Refresh control callback
   */
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  /**
   * Opens the modal to edit a specific video item
   * @param {VideoData} item - The video item to be edited
   */
  const openItem = (item: VideoData) => {
    setForm({
      id: item.id,
      title: item.title,
      recipient: item.recipients,
      thumbnail: item.thumbnail,
      video: item.video
    });
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView className='bg-primary h-full' edges={['right', 'left', 'bottom']}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: VideoData }) => (
          <VideoCapsoool 
            id={item.id}
            title={item.title}
            recipients={item.recipients}
            thumbnail={item.thumbnail}
            video={item.video}
            createdAt={item.createdAt}
          />
        )}
        ListHeaderComponent={() => (
          <UserInfo user={user} trustedPersons={trustedPersons} />
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
  );
};

export default Videos;