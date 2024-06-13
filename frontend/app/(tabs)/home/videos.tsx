import { DataContext } from '@/components/contexts/DataContext';
import EmptyState from '@/components/EmptyState';
import VideoCapsoool, { VideoData } from '@/components/VideoCapsoool';
import { UserContext } from '@/components/contexts/UserContext';
import UserInfo from '@/components/UserInfo';
import { fetchData } from '@/functions/fetchData';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Animated, ScrollView, Alert } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { deleteItem } from '@/functions/delete';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 50;

const Videos = () => {
  const { user } = useContext(UserContext);
  const { allData } = useContext(DataContext);

  const [texts, trustedPersons, videos, image] = allData || [[], [], [], []];

  // State hooks
  const [videoData, setVideoData] = useState<VideoData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);


  // videodata: {
  //   title='', 
  //   creator='',
  //   avatar='',
  //   thumbnail='',
  //   video='http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
  // }

  // Form state
  const [form, setForm] = useState({
    id: 0,
    title: '',
    creator: '',
    avatar: '',
    thumbnail: '',
    video: ''
  });

  const url = `http://localhost:5000/home/${user?.id}`;

  // Fetch data when the component mounts or user changes
  useEffect(() => {
    fetchData(url, setVideoData, setIsLoading);
  }, [user]);

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
   * Opens the modal to edit a specific text item
   * @param {TextData} item - The text item to be edited
   */
  const openItem = (item: VideoData) => {
    setForm({
      id: item.id,
      title: item.title,
      creator: item.creator,
      avatar: item.avatar,
      thumbnail: item.thumbnail,
      video: item.video
    });
    setIsModalVisible(true);
  };

  const titl = 'Ita'
  const uri = 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'

  return (
    <SafeAreaView className='bg-primary h-full' edges={['right', 'left', 'bottom']}>
      <FlatList
        data={videoData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: VideoData }) => (
          <VideoCapsoool 
            id={item.id}
            title={item.title} 
            creator='The man'
            avatar={require('@/assets/images/profile.png')}
            thumbnail={require('@/assets/images/thumbnail.png')}
            video={uri}
            >
          </VideoCapsoool>
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
