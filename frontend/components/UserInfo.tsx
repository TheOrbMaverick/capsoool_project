import React from 'react';
import { View, Text } from 'react-native';
import Trusted from '@/components/Trusted';
import { User } from './UserContext';
import { TrustedPerson } from '@/components/Trusted';

interface UserInfoProps {
  user: User | null;
  trustedPersons: TrustedPerson[];
}

const UserInfo: React.FC<UserInfoProps> = ({ user, trustedPersons }) => {

  return (
    <View className='px-2 space-y-2'>
      <View className='justify-between items-start flex-row mb-0'>
        <View>
          <Text className='font-pmedium text-sm text-gray-100 pt-6'>
            Welcome
          </Text>
          <Text className='text-2xl font-psemibold text-white'>
            {user?.first_name} {user?.last_name}
          </Text>
          <Text className='text-gray-100 text-lg font-regular mb-3'>
            {user?.email}
          </Text>
        </View>
      </View>

      <View className='pt-0 pb-0'>
        <Text className='text-gray-100 text-lg font-regular mb-3'>
          Your trusted people:
        </Text>
        <Trusted trusted_person={trustedPersons} />
      </View>
    </View>
  );
};

export default UserInfo;