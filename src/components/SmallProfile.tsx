import NotificationIcon from '@icons/notification.svg'
import SettingIcon from '@icons/setting.svg'
import { StackNav } from '@utils/types'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function SmallProfile({ RightSide }: { RightSide?: React.ReactNode }) {
  return (
    <View className='flex flex-row items-center justify-between'>
      <View className='flex flex-row gap-4'>
        <Image source={{ uri: 'https://picsum.photos/100' }} className='h-12 w-12 rounded-full' />
        <View>
          <Text className='text-sm text-neutral-500'>Welcome</Text>
          <Text className='font-bold' style={{ fontSize: 18 }}>
            Abinash Karmakar
          </Text>
        </View>
      </View>
      {RightSide ? RightSide : null}
    </View>
  )
}

export function RightSideSmallProfile({ navigation }: { navigation: StackNav }) {
  return (
    <View className='flex flex-row gap-3'>
      <TouchableOpacity className='p-2' onPress={() => navigation.navigate('Notifications')}>
        <NotificationIcon height={22} width={22} />
      </TouchableOpacity>
      <TouchableOpacity className='p-2' onPress={() => navigation.navigate('Settings')}>
        <SettingIcon height={22} width={22} />
      </TouchableOpacity>
    </View>
  )
}
