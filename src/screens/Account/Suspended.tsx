import { SmallButton } from '@components/Button'
import DoubtEmoji from '@icons/doubt_emoji.svg'
import React from 'react'
import { Dimensions, Text, View } from 'react-native'

const { width, height } = Dimensions.get('window')

const iconSize = width * 0.35

export default function Suspended() {
  return (
    <View className='flex-1 items-center justify-center p-6'>
      <View className='items-center justify-center gap-5'>
        <DoubtEmoji width={iconSize} height={iconSize} />
        <Text className='text-3xl font-bold'>Account Suspended</Text>
        <Text className='px-2 text-center text-lg'>We are sorry to inform you that your account is being suspended due to suspicious activities</Text>
        <View className='pt-5'>
          <SmallButton title='Contact with Admin' className='bg-red-500 px-6 py-3 text-white' />
        </View>
      </View>
    </View>
  )
}
