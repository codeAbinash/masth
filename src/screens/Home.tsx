import {NavigationProp, ParamListBase} from '@react-navigation/native'
import React from 'react'
import {Dimensions, Image, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import icons from '../assets/icons/icons'
import {Button} from '../components/Button'
import {Input} from '../components/Input'
const {width} = Dimensions.get('window')

const appIconSize = 0.6

export default function Home({navigation}: {navigation: NavigationProp<ParamListBase>}) {
  return (
    <View className='flex h-full flex-1 justify-between bg-white p-4 pb-2'>
      <View />
      <View className='flex items-center justify-center'>
        <Image source={icons.appIcon} style={{width: width * appIconSize * 1.37, height: width * appIconSize}} />
        <Text className='text-center font-mono text-4xl font-bold text-black'>Welcome</Text>
        <Text className='p-4 px-10 text-center text-lg text-neutral-500'>
          There are many variations of passages of Lorem Ipsum available
        </Text>
      </View>
      <View style={{gap: 10}}>
        <Input placeholder='Email' icon={'at'} IconProvider={Icon} />
        <View className='mt-4' />
        <Button
          title='Sign In'
          onPress={() => navigation.navigate('Notifications')}
          IconProvider={Icon}
          icon='account'
        />
        <Button title='Create Account' variant='outline' IconProvider={Icon} icon='creation' />
      </View>
      <Text className='text-center text-gray-600'>By continuing you are accepting our Terms and Conditions</Text>
    </View>
  )
}
