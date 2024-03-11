import useHybridData from '@/hooks/useHybridData'
import BackHeader, { RightSettingIcon } from '@components/BackHeader'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import KeyboardAvoidingContainer from '@components/KeyboardAvoidingContainer'
import Label from '@components/Label'
import { PaddingBottom } from '@components/SafePadding'
import { Select } from '@components/Select'
import { profile_f, ProfileT } from '@query/api'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useQuery } from '@tanstack/react-query'
import { StackNav } from '@utils/types'
import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/MaterialIcons'

// import { Image } from 'react-native-svg'

export default function Settings({ navigation }: { navigation: StackNav }) {
  const profileQuery = useQuery({ queryKey: ['profile'], queryFn: profile_f })
  const localProfile = useHybridData<ProfileT>(profileQuery, 'profile')
  const profile = profileQuery.data?.data || localProfile?.data
  const [showDatePicker, setShowDatePicker] = React.useState(false)

  const [fullName, setFullName] = useState(profile?.name || '')
  const [email, setEmail] = useState(profile?.email || '')
  const [dob, setDob] = useState(new Date(profile?.date_of_birth || ''))

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
            <Text className='text-center text-2xl'>@{profile?.username || 'Loading...'}</Text>
            <Text className='text-center text-lg text-neutral-700'>Hi There, {profile?.name.split(' ')[0] || 'Loading...'}</Text>
          </View>
        </View>
        <View className='mt-5 flex-1' style={{ gap: 10 }}>
          <View>
            <Label title='Full Name' />
            <Input
              placeholder='Full Name'
              LeftUI={<MaterialCommunityIcon name='account-outline' size={20} color='black' />}
              value={fullName}
              onChangeText={(text) => setFullName(text)}
            />
          </View>
          <View>
            <Label title='Email' />
            <Input
              placeholder='Email'
              keyboardType='email-address'
              LeftUI={<MaterialCommunityIcon name='email-outline' size={20} color='black' />}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View>
            <Label title='Mobile Number' />
            <Input
              placeholder='Mobile Number'
              keyboardType='phone-pad'
              value={'+' + profile?.country_code + ' ' + profile?.phone_number}
              editable={false}
              LeftUI={<MaterialCommunityIcon name='phone-outline' size={20} color='black' />}
            />
          </View>
          <View>
            <Label title='Date of Birth' />
            <Select
              placeholder='Date of Birth'
              space={15}
              LeftUI={<MaterialCommunityIcon name='calendar-month-outline' size={20} color='black' />}
              RightUI={null}
              onPress={() => {
                setShowDatePicker(true)
              }}
              value={dob && dob.toLocaleDateString('en', { day: 'numeric', month: 'short', year: 'numeric' })}
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
      {showDatePicker && (
        <DateTimePicker
          mode='date'
          display='default'
          onChange={({ type }, selectDate) => {
            setShowDatePicker(false)
            if (type === 'set') {
              setDob(selectDate || dob)
            }
          }}
          value={dob || new Date()}
        />
      )}
    </View>
  )
}
