import useHybridData from '@/hooks/useHybridData'
import NotificationIcon from '@icons/notification.svg'
import SettingIcon from '@icons/setting.svg'
import { ProfileT, profile_f } from '@query/api'
import { useNavigation, type NavigationProp } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { StackNav } from '@utils/types'
import type { RootStackParamList } from 'App'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function SmallProfile({ RightSide }: { RightSide?: React.ReactNode }) {
  const profileQuery = useQuery({ queryKey: ['profile'], queryFn: profile_f })
  const localProfile = useHybridData<ProfileT>(profileQuery, 'profile')
  const profile = profileQuery.data?.data || localProfile?.data
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  // useEffect(() => {
  //   console.log(JSON.stringify(profile, null, 2))
  // }, [profile])

  return (
    <View className='flex flex-row items-center justify-between'>
      <TouchableOpacity className='flex flex-row gap-3.5' activeOpacity={0.7} onPress={() => navigation.navigate('EditProfile')}>
        <Image source={{ uri: profile?.profile_pic || 'https://picsum.photos/100' }} className='h-10 w-10 rounded-full bg-neutral-200' />
        <View>
          <Text className='text-sm text-neutral-500'>Welcome</Text>
          <Text className='font-bold' style={{ fontSize: 16 }}>
            {profile?.name || 'Loading...'}
          </Text>
        </View>
      </TouchableOpacity>
      {RightSide ? RightSide : null}
    </View>
  )
}

export function RightSideSmallProfile({ navigation }: { navigation: StackNav }) {
  return (
    <View className='flex flex-row gap-2'>
      <TouchableOpacity
        className='p-2'
        onPress={() => {
          // navigation.navigate('Notifications')
        }}
      >
        <NotificationIcon height={20} width={20} />
      </TouchableOpacity>
      <TouchableOpacity className='p-2' onPress={() => navigation.navigate('Settings')}>
        <SettingIcon height={20} width={20} />
      </TouchableOpacity>
    </View>
  )
}
