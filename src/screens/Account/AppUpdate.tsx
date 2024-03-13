import { SmallButton } from '@components/Button'
import AppUpdateIcon from '@icons/update_setting.svg'
import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
const { width, height } = Dimensions.get('window')

const iconSize = width * 0.35

export default function AppUpdate() {
  return (
    <View className='flex-1 items-center justify-center p-6'>
      <View className='items-center justify-center gap-5'>
        <AppUpdateIcon width={iconSize} height={iconSize} />
        <Text className='text-3xl font-bold'>App Update Available</Text>
        <Text className='px-2 text-center text-lg'>Please update your app to get the latest functions and bugs free experience.</Text>
        <View className='pt-5'>
          <SmallButton title='Update Now' className='px-6 py-3' LeftUI={<Icon name='logo-google-playstore' size={16} color='white' />} />
        </View>
      </View>
    </View>
  )
}
