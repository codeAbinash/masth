import BackHeader, {RightSettingIcon} from '@components/BackHeader'
import SwapGreen from '@icons/transaction-green.svg'
import SwapRed from '@icons/transaction-red.svg'
import {StackNav} from '@utils/types'
import React from 'react'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'

const transactions = [
  {
    green: false,
    message: 'Sent to John Doe. This is a very very long message. This is too long ',
    date: new Date(),
    amount: 0.001,
  },
  {green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002},
  {green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002},
  {green: false, message: 'Sent to John Doe', date: new Date(), amount: 0.001},
  {green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002},
  {
    green: false,
    message: 'Sent to John Doe. This is a very very long message. This is too long ',
    date: new Date(),
    amount: 0.001,
  },
  {green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002},
  {green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002},
  {green: false, message: 'Sent to John Doe', date: new Date(), amount: 0.001},
  {green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002},
  {
    green: false,
    message: 'Sent to John Doe. This is a very very long message. This is too long ',
    date: new Date(),
    amount: 0.001,
  },
  {green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002},
  {green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002},
  {green: false, message: 'Sent to John Doe', date: new Date(), amount: 0.001},
  {green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002},
  {
    green: false,
    message: 'Sent to John Doe. This is a very very long message. This is too long ',
    date: new Date(),
    amount: 0.001,
  },
  {green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002},
  {green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002},
  {green: false, message: 'Sent to John Doe', date: new Date(), amount: 0.001},
  {green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002},
  {
    green: false,
    message: 'Sent to John Doe. This is a very very long message. This is too long ',
    date: new Date(),
    amount: 0.001,
  },
  {green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002},
  {green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002},
  {green: false, message: 'Sent to John Doe', date: new Date(), amount: 0.001},
  {green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002},
]

export default function Transactions({navigation}: {navigation: StackNav}) {
  return (
    <View className='flex-1 bg-bgSecondary'>
      <BackHeader navigation={navigation} title='' RightComponent={<RightSettingIcon navigation={navigation} />} />
      <FlatList
        data={transactions}
        renderItem={({item}) => <TransactionCard {...item} navigation={navigation} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{paddingHorizontal: 20, gap: 15, marginTop: 0, paddingBottom: 50}}
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
      <Text style={{fontSize: 30}}>Transactions</Text>
    </>
  )
}

function TransactionCard({
  green = true,
  message,
  date,
  amount,
  navigation,
}: {
  green?: boolean
  message?: string
  date: Date
  amount?: number
  navigation: StackNav
}) {
  const textColor = green ? '#24C917' : '#F9522E'
  const backgroundColor = green ? '#EAF9E9' : '#FEE9E4'
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className='flex-row items-center justify-between rounded-2xl bg-white p-2.5'
      onPress={() => navigation.navigate('TransactionDetails', {green, message, date: date.toISOString(), amount})}>
      <View className='flex-row gap-3' style={{flex: 1}}>
        <View style={{backgroundColor}} className='rounded-xl p-2.5'>
          {green ? <SwapGreen height={30} width={30} /> : <SwapRed height={30} width={30} />}
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
      <View>
        <Text className='pr-2 text-lg' style={{color: textColor}}>
          {green ? '+' : '-'}
          {amount}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
