import { View, Text, FlatList } from 'react-native'
import React from 'react'

interface Item {
    id: number;
}

interface Trending {
    posts: { id: number }[];
}

const Trending: React.FC<Trending>= ({ posts }) => {

  return (
    <FlatList
    data={posts}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
        <Text className='text-3xl text-white' text-white>{item.id}</Text>
    )}
    horizontal
    />
  )
}

export default Trending