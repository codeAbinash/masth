import icons from '@assets/icons'
import {Button} from '@components/Button'
import {Input} from '@components/Input'
import {Select} from '@components/Select'
import {StackNav} from '@utils/types'
import React from 'react'
import {Dimensions, Image, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const {width} = Dimensions.get('window')

const appIconSize = 0.5

export default function Login({navigation}: {navigation: StackNav}) {
  return (
    <View className='flex h-full flex-1 justify-between bg-white p-4 pb-2'>
      <View />
      <View />
      <View>
        <View className='flex items-center justify-center'>
          <Image source={icons.appIcon} style={{width: width * appIconSize * 1.37, height: width * appIconSize}} />
          <Text className='text-center font-mono text-4xl font-bold text-black'>Welcome</Text>
          <Text className='p-4 px-10 pt-1 text-center text-lg text-neutral-500' style={{lineHeight: 25}}>
            There are many variations of passages of Lorem Ipsum available
          </Text>
        </View>
        <View style={{gap: 10, marginTop: 10}}>
          <View className='flex flex-row items-center justify-center' style={{gap: 10}}>
            <Select title='+91' icon='phone-outline' IconProvider={Icon} style={{flex: 0.45}} />
            <Input placeholder='Mobile Number' keyboardType='number-pad' className='flex-1' />
          </View>
          <View className='mt-3' />
          <Button
            title='Log In'
            onPress={() => navigation.navigate('Notifications')}
            IconProvider={Icon}
            icon='account'
          />
          <Button
            title='Create Account'
            variant='outline'
            IconProvider={Icon}
            icon='creation'
            className='mt-1'
            onPress={() => navigation.replace('SignUp')}
          />
        </View>
      </View>
      <View />
      <View />
      <View />
      <Text className='text-center text-gray-600'>By continuing you are accepting our Terms and Conditions</Text>
    </View>
  )
}
