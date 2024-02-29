import BackHeader, { RightSettingIcon } from '@components/BackHeader'
import { Button } from '@components/Button'
import { PaddingBottom } from '@components/SafePadding'
import Tabs from '@components/Tabs'
import Clipboard from '@react-native-community/clipboard'
import { colors } from '@utils/colors'
import { StackNav } from '@utils/types'
import { shareText } from '@utils/utils'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import ActiveMiners from './ActiveMiners'
import InActiveMiners from './InActiveMiners'

export default function Refer({ navigation }: { navigation: StackNav }) {
  return (
    <View className='flex-1 bg-bgSecondary'>
      <BackHeader navigation={navigation} title='Refer' RightComponent={<RightSettingIcon navigation={navigation} />} />
      <ScrollView className='px-5'>
        <TotalEarned />
        <ReferCard />
        <ReferredTabs />
        <Tabs
          tabs={[
            {
              title: 'Active Miners',
              UI: <ActiveMiners />,
            },
            {
              title: 'Inactive Miners',
              UI: <InActiveMiners />,
            },
          ]}
        />
        <PaddingBottom />
      </ScrollView>
    </View>
  )
}

function ReferredTabs() {
  return null
}

function ReferCard() {
  const referText =
    'Refer a friend and earn 10% commission on every mining they do. Share your referral code with your friends and family and earn more.'
  return (
    <View className='mt-5 rounded-3xl bg-white p-5'>
      <View>
        <Text className='text-xl'>Get 10% Commission</Text>
        <Text className='text-base text-neutral-600'>Every time when your friend started mining</Text>
      </View>
      <ReferCode />
      <Button
        title='Refer'
        className='mt-4'
        icon={'share-2'}
        IconProvider={Icon}
        onPress={() => shareText(referText)}
        style={{ padding: 13 }}
      />
    </View>
  )
}

function ReferCode({ str = 'CRP22043' }) {
  const [copied, setCopied] = useState(false)
  const onPress = () => {
    Clipboard.setString(str)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }
  return (
    <View className='mt-4 flex-row items-center justify-between rounded-xl bg-bgSecondary p-3.5 pl-4'>
      <View className='flex-row'>
        <View className='flex-row'>
          <Text className='text-base'>Refer Code: </Text>
        </View>
        <View>
          <Text className='text-base text-accent'>CRP22043</Text>
        </View>
      </View>
      <TouchableOpacity className='pr-1' onPress={onPress}>
        {copied ? <Icon name='check' size={18} color={colors.greenPrimary} /> : <Icon name='copy' size={18} />}
      </TouchableOpacity>
    </View>
  )
}
function TotalEarned() {
  return (
    <View className='mt-5 items-center justify-center' style={{ gap: 10 }}>
      <Text className='text-xl text-neutral-600'>You've Earned</Text>
      <View className='flex-row items-end gap-x-1'>
        <Text style={{ fontSize: 43 }}>62.524</Text>
        <Text style={{ fontSize: 25 }} className='pb-1 text-neutral-600'>
          MST
        </Text>
      </View>
    </View>
  )
}
