import BackHeader, {RightSettingIcon} from '@components/BackHeader'
import {StackNav} from '@utils/types'
import NotificationBellIcon from '@icons/bell.svg'
import React from 'react'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'

type TransactionType = {
  message: string
  date: Date
}

const transactions: TransactionType[] = [
  {
    message: '@codeAbinash just joined using your referral link',
    date: new Date(),
  },
  {
    message: 'You just received 0.001 MST from @codeAbinash',
    date: new Date(),
  },
  {
    message: '@codeAbinash just joined using your referral link',
    date: new Date(),
  },
  {
    message: 'You just received 0.001 MST from @codeAbinash',
    date: new Date(),
  },
  {
    message: '@codeAbinash just joined using your referral link',
    date: new Date(),
  },
  {
    message: 'You just received 0.001 MST from @codeAbinash',
    date: new Date(),
  },
  {
    message: '@codeAbinash just joined using your referral link',
    date: new Date(),
  },
  {
    message: 'You just received 0.001 MST from @codeAbinash',
    date: new Date(),
  },
  {
    message: '@codeAbinash just joined using your referral link',
    date: new Date(),
  },
  {
    message: 'You just received 0.001 MST from @codeAbinash',
    date: new Date(),
  },
  {
    message: '@codeAbinash just joined using your referral link',
    date: new Date(),
  },
  {
    message: 'You just received 0.001 MST from @codeAbinash',
    date: new Date(),
  },
  {
    message: '@codeAbinash just joined using your referral link',
    date: new Date(),
  },
  {
    message: 'You just received 0.001 MST from @codeAbinash',
    date: new Date(),
  },
  {
    message: '@codeAbinash just joined using your referral link',
    date: new Date(),
  },
  {
    message: 'You just received 0.001 MST from @codeAbinash',
    date: new Date(),
  },
  {
    message: '@codeAbinash just joined using your referral link',
    date: new Date(),
  },
  {
    message: 'You just received 0.001 MST from @codeAbinash',
    date: new Date(),
  },
  {
    message: '@codeAbinash just joined using your referral link',
    date: new Date(),
  },
  {
    message: 'You just received 0.001 MST from @codeAbinash',
    date: new Date(),
  },
  {
    message: '@codeAbinash just joined using your referral link',
    date: new Date(),
  },
  {
    message: 'You just received 0.001 MST from @codeAbinash',
    date: new Date(),
  },
]

export default function Notifications({navigation}: {navigation: StackNav}) {
  return (
    <View className='flex-1 bg-bgSecondary'>
      <BackHeader navigation={navigation} title='' RightComponent={<RightSettingIcon navigation={navigation} />} />
      <FlatList
        data={transactions}
        renderItem={({item}) => <TransactionCard {...item} navigation={navigation} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{paddingHorizontal: 20, gap: 13, marginTop: 0, paddingBottom: 50}}
        ListHeaderComponent={<ListHeader />}
      />
    </View>
  )
}

function ListHeader() {
  return (
    <>
      <Text className='text-neutral-500' style={{fontSize: 30}}>
        Your,{' '}
      </Text>
      <Text style={{fontSize: 30}}>Notifications</Text>
    </>
  )
}

function TransactionCard({message, date, navigation}: {message?: string; date: Date; navigation: StackNav}) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className='flex-row items-center justify-between rounded-2xl bg-white p-2.5 pr-4'
      onPress={() => navigation.navigate('NotificationDetails', {message, date: date.toISOString()})}>
      <View className='flex-row gap-3' style={{flex: 1}}>
        <View style={{backgroundColor: '#ffeed5'}} className='rounded-xl p-3'>
          <NotificationBellIcon width={25} height={25} />
        </View>
        <View style={{flex: 1}}>
          <Text className='text-lg' numberOfLines={1}>
            {message}
          </Text>
          <Text className='text-neutral-500'>
            {date?.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}
            {', '}
            {date?.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
