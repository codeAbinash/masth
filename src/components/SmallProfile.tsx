import NotificationIcon from '@icons/notification.svg'
import SettingIcon from '@icons/setting.svg'
import { StackNav } from '@utils/types'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function SmallProfile({ RightSide }: { RightSide?: React.ReactNode }) {
  return (
    <View className='flex flex-row items-center justify-between'>
      <View className='flex flex-row gap-4 '>
        <Image source={{ uri: 'https://picsum.photos/100' }} className='h-11 w-11 rounded-full bg-neutral-200' />
        <View>
          <Text className='text-sm text-neutral-500'>Welcome</Text>
          <Text className='font-bold' style={{ fontSize: 16 }}>
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
    <View className='flex flex-row gap-2'>
      <TouchableOpacity className='p-2' onPress={() => navigation.navigate('Notifications')}>
        <NotificationIcon height={20} width={20} />
      </TouchableOpacity>
      <TouchableOpacity className='p-2' onPress={() => navigation.navigate('Settings')}>
        <SettingIcon height={20} width={20} />
      </TouchableOpacity>
    </View>
  )
}
