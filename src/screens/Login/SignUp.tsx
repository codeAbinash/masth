import icons from '@assets/icons'
import {Button} from '@components/Button'
import {Input} from '@components/Input'
import {Select} from '@components/Select'
import {StackNav} from '@utils/types'
import React from 'react'
import {Dimensions, Image, Text, View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconM from 'react-native-vector-icons/MaterialIcons'

const appIconSize = 0.5

const {width} = Dimensions.get('window')

export default function SignUp0({navigation}: {navigation: StackNav}) {
  return (
    <ScrollView className='bg-white'>
      <View className='flex h-full flex-1 justify-between bg-white p-4 pb-2'>
        <View>
          <View className='flex items-center justify-center'>
            <Image source={icons.appIcon} style={{width: width * appIconSize * 1.37, height: width * appIconSize}} />
            <Text className='text-center font-mono text-4xl font-bold text-black'>Let's Sign Up</Text>
            <Text className='p-4 px-10 pt-1 text-center text-lg text-neutral-500' style={{lineHeight: 25}}>
              There are many variations of passages of Lorem Ipsum available
            </Text>
          </View>
          <View style={{gap: 10, marginTop: 10}}>
            <Input placeholder='Username' icon={'at'} IconProvider={Icon} />
            <Input placeholder='Full Name' icon={'account-outline'} IconProvider={Icon} />
            <View className='flex flex-row items-center justify-center' style={{gap: 10}}>
              <Select title='+91' icon='phone-outline' IconProvider={Icon} style={{flex: 0.45}} />
              <Input placeholder='Mobile Number' keyboardType='number-pad' className='flex-1' />
            </View>
            <Select title='DOB' icon='calendar-month-outline' IconProvider={Icon} />
            <Select title='Language' icon='language' IconProvider={IconM} />
            <Button title='Create Account' IconProvider={Icon} icon='creation' onPress={() => {}} className='mt-4' />
            <Button
              title='Log In'
              variant='outline'
              IconProvider={Icon}
              icon='account'
              className='mt-1'
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </View>
        <Text className='mt-2 text-center text-gray-600'>By continuing you are accepting our Terms and Conditions</Text>
      </View>
    </ScrollView>
  )
}
