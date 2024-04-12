import { View, Text, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { PaddingBottom } from '@components/SafePadding'

export default function BottomText() {
  return (
    <View>
      <View className='flex-row flex-wrap items-center justify-center'>
        <Text className='text-center text-gray-600'>By continuing you are accepting our </Text>
        <TouchableOpacity>
          <Text className='text-center text-blue-500' onPress={() => Linking.openURL('https://minemasth.com/terms_and_conditions.html')}>
            Terms & Conditions
          </Text>
        </TouchableOpacity>
        <Text className='text-center text-gray-600'> and </Text>
        <TouchableOpacity>
          <Text className='text-center text-blue-500' onPress={() => Linking.openURL('https://minemasth.com/privacy.html')}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>
      <PaddingBottom />
    </View>
  )
}
