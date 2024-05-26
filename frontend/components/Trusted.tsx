// import { View, Text, FlatList } from 'react-native'
// import React, { useContext, useEffect, useState } from 'react'
// import * as Animatable from 'react-native-animatable';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { fetchData } from '@/functions/fetchData';
// import { UserContext } from './UserContext';
// import { TextData } from './TextCapsoool';

// interface Item {
//   id: number;
// }

// interface Trusted {
//   trusted_person: { id: number }[];
// }

// const zoomIn = {
//   0: {
//     scale: 0.9
//   },
//   1: {
//     scale: 1,
//   }
// }

// const zoomOut = {
//   0: {
//     scale: 1
//   },
//   1: {
//     scale: 0.9,
//   }
// }

// const { user } = useContext(UserContext);

// const url = `/home/${user?.id}/trusted`
// const [data, setData] = useState<TextData[]>([]);
// const [refreshing, setRefreshing] = useState(false);
// const [isLoading, setIsLoading] = useState(true);

// useEffect(() => {
//   fetchData(url, setData);
// }, [user]);

// console.log(data)


// // const TrustedItem = ({activeItem, item}) => {
// //   const [play, setPlay] = useState(false)
// //   return (
// //     <Animatable.View
// //       className='mr-5'
// //       animation={activeItem === item.$id ? zoomIn : zoomOut}
// //       duration={500}
// //       >
// //         {play ? (
// //           <Text className='text-white'>Playing</Text>
// //         ) : (
// //           <TouchableOpacity></TouchableOpacity>
// //         )}

// //     </Animatable.View>
// //   )
// // }

// const Trusted: React.FC<Trusted>= ({ trusted_person }) => {
//   const [activeItem, setActiveItem] = useState(trusted_person[0])

//   return (
//     <FlatList
//     data={trusted_person}
//     keyExtractor={(item) => item.id.toString()}
//     renderItem={({ item }) => (
//         // <TrustedItem activeItem={activeItem} item={item} />
//         <Text>Hi</Text>
//     )}
//     horizontal
//     />
//   )
// }

// export default Trusted
