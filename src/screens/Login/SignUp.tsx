import icons from '@assets/icons/icons'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { Select } from '@components/Select'
import { StackNav } from '@utils/types'
import React from 'react'
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconM from 'react-native-vector-icons/MaterialIcons'

const appIconSize = 0.45

const { width } = Dimensions.get('window')

export default function SignUp({ navigation }: { navigation: StackNav }) {
  return (
    <ScrollView className='bg-white'>
      <View className='flex h-full flex-1 justify-between bg-white p-4 pb-2'>
        <View>
          <View className='mt-2 flex items-center justify-center'>
            <Image source={icons.appIcon} style={{ width: width * appIconSize * 1.37, height: width * appIconSize }} />
            <Text className='text-center font-mono text-3xl font-bold text-black'>Let's Sign Up</Text>
            <Text className='p-4 px-10 pt-1 text-center text-lg text-neutral-500' style={{ lineHeight: 25 }}>
              There are many variations of passages of Lorem Ipsum available
            </Text>
          </View>
          <View style={{ gap: 10, marginTop: 10 }}>
            <Input placeholder='Username' LeftUI={<Icon name='at' size={20} color='black' />} />
            <Input placeholder='Full Name' LeftUI={<Icon name='account-outline' size={20} color='black' />} />
            <View className='flex flex-row items-center justify-center' style={{ gap: 10 }}>
              <Select placeholder='+91' LeftUI={<Icon name='phone-outline' size={20} color='black' />} style={{ flex: 0.45 }} />
              <Input placeholder='Mobile Number' keyboardType='phone-pad' className='flex-1' />
            </View>
            <Select placeholder='DOB' space={15} LeftUI={<Icon name='calendar-month-outline' size={20} color='black' />} RightUI={null} />
            <Select placeholder='Language' space={15} LeftUI={<IconM name='language' size={20} color='black' />} />
            <Button
              title='Create Account'
              onPress={() => {
                navigation.replace('Home')
              }}
              LeftUI={<Icon name='creation' size={17} color='white' />}
              className='mt-4'
            />
            <Button
              title='Log In'
              variant='outline'
              className='mt-1'
              onPress={() => navigation.navigate('Login')}
              LeftUI={<Icon name='account' size={17} />}
            />
          </View>
        </View>
        <Text className='mt-2 text-center text-gray-600'>By continuing you are accepting our Terms and Conditions</Text>
      </View>
    </ScrollView>
  )
}
