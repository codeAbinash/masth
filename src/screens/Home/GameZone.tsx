import { View, Text, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { colors } from '@utils/colors'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import SmallProfile, { RightSideSmallProfile } from '@components/SmallProfile'
import { StackNav } from '@utils/types'
import Tabs from '@components/Tabs'
import ComingSoonSvg from '@icons/coming-soon.svg'

export default function GameZone({ navigation }: { navigation: StackNav }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bgSecondary }}>
      <View className='p-5'>
        <PaddingTop />
        <SmallProfile RightSide={<RightSideSmallProfile navigation={navigation} />} />
        <Tabs
          tabs={[
            { title: 'GameZone', UI: <ComingSoon /> },
            { title: 'Giveaway', UI: <ComingSoon /> },
          ]}
        />
        <PaddingBottom />
      </View>
    </ScrollView>
  )
}

const { width } = Dimensions.get('window')

function ComingSoon() {
  return (
    <View className='mt-5 flex-1 items-center justify-center'>
      <ComingSoonSvg width={width * 0.85} />
      <Text className='mt-5 text-2xl'>Coming Soon</Text>
      <Text className='mt-2 px-5 text-center text-neutral-600' style={{ fontSize: 16 }}>
        This feature is under development and will be available soon. Stay tuned!
      </Text>
    </View>
  )
}
