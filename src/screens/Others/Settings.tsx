import BackHeader, {RightSettingIcon} from '@components/BackHeader'
import {PaddingBottom} from '@components/SafePadding'
import {StackNav} from '@utils/types'
import React from 'react'
import {ScrollView, Text, View} from 'react-native'

export default function Settings({navigation}: {navigation: StackNav}) {
  return (
    <View className='bg-bgSecondary flex-1'>
      <BackHeader
        navigation={navigation}
        title='Settings'
        RightComponent={<RightSettingIcon navigation={navigation} />}
      />
      <ScrollView className='px-5'>
        <Text>This is the settings page. You can change your password, update your profile, and more.</Text>
        <Text className='text-2xl font-bold'>Settings</Text>
        <Text>Change Password</Text>
        <Text className='pb-10'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur illo, quaerat exercitationem magni odio
          omnis nesciunt vel harum doloremque ut itaque alias debitis sint dolor inventore, cupiditate, quia facere sit?
        </Text>
        <PaddingBottom />
      </ScrollView>
    </View>
  )
}
