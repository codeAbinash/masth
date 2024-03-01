import BackHeader, { RightSettingIcon } from '@components/BackHeader'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import KeyboardAvoidingContainer from '@components/KeyboardAvoidingContainer'
import Label from '@components/Label'
import { PaddingBottom } from '@components/SafePadding'
import { Select } from '@components/Select'
import { StackNav } from '@utils/types'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/MaterialIcons'
// import { Image } from 'react-native-svg'

function SignOut() {
  return (
    <TouchableOpacity className='rounded-full border border-red-500/30 bg-red-500/20 p-2 px-5'>
      <Text className='text-red-500'>Sign Out</Text>
    </TouchableOpacity>
  )
}

export default function Settings({ navigation }: { navigation: StackNav }) {
  return (
    <View className='flex-1 bg-bgSecondary'>
      <BackHeader navigation={navigation} title='Edit Profile' RightComponent={<RightSettingIcon navigation={navigation} />} />
      <KeyboardAvoidingContainer className='px-5'>
        <View className='mt-5 items-center justify-center'>
          <View className='relative'>
            <Image className='rounded-full bg-neutral-200' source={{ uri: 'https://picsum.photos/201' }} style={{ width: 140, height: 140 }} />
            <TouchableOpacity activeOpacity={0.7} style={{ position: 'absolute', bottom: 0, right: 0 }} className='rounded-full bg-white p-3'>
              <Icon name='edit' size={20} />
            </TouchableOpacity>
          </View>
          <View className='mt-5'>
            <Text className='text-center text-2xl'>@codeAbinash</Text>
            <Text className='text-center text-lg text-neutral-700'>Hi There, Abinash</Text>
          </View>
        </View>
        <View className='mt-5 flex-1' style={{ gap: 10 }}>
          <View>
            <Label title='Full Name' />
            <Input
              placeholder='Full Name'
              LeftUI={<MaterialCommunityIcon name='account-outline' size={20} color='black' />}
              value='Abinash Karmakar'
              RightUI={<MaterialCommunityIcon name='pencil' size={20} color='black' />}
            />
          </View>
          <View>
            <Label title='Email' />
            <Input
              placeholder='Email'
              keyboardType='email-address'
              LeftUI={<MaterialCommunityIcon name='email-outline' size={20} color='black' />}
              value='codeAbinash@gmail.com'
            />
          </View>
          <View>
            <Label title='Mobile Number' />
            <Input
              placeholder='Mobile Number'
              keyboardType='phone-pad'
              value='+91 9876543210'
              editable={false}
              LeftUI={<MaterialCommunityIcon name='phone-outline' size={20} color='black' />}
            />
          </View>
          <View>
            <Label title='Date of Birth' />
            <Select
              space={15}
              placeholder='Date of Birth'
              RightUI={null}
              LeftUI={<MaterialCommunityIcon name='calendar-month-outline' size={20} color='black' />}
              // value='1999-01-01'
            />
          </View>
          <Button
            title='Save Changes'
            onPress={() => {
              navigation.goBack()
            }}
            className='mt-4'
            LeftUI={<MaterialCommunityIcon name='creation' size={16} color='white' />}
          />
        </View>
        <PaddingBottom />
      </KeyboardAvoidingContainer>
    </View>
  )
}
