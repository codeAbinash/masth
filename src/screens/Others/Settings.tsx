import BackHeader, { RightSettingIcon } from '@components/BackHeader'
import { PaddingBottom } from '@components/SafePadding'
import { StackNav } from '@utils/types'
import React from 'react'
import { Dimensions, ScrollView, Text, View } from 'react-native'

import ComingSoonSvg from '@icons/coming-soon-2.svg'

export default function Settings({ navigation }: { navigation: StackNav }) {
  return (
    <View className='flex-1 bg-bgSecondary'>
      <BackHeader
        navigation={navigation}
        title='Settings'
        RightComponent={<RightSettingIcon navigation={navigation} />}
      />
      <ScrollView className='px-5'>
        <ComingSoon />
        <PaddingBottom />
      </ScrollView>
    </View>
  )
}

const { width } = Dimensions.get('window')

function ComingSoon() {
  return (
    <View className='mt-5 flex-1 items-center justify-center'>
      <ComingSoonSvg width={width * 0.85} />
      <Text className='mt-5 text-2xl'>Coming Soon</Text>
      <Text className='mt-2 px-5 text-center text-neutral-600' style={{ fontSize: 16 }}>
        Settings feature is under development and will be available soon. Stay tuned!
      </Text>
    </View>
  )
}
