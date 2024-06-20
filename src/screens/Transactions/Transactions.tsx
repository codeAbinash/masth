import BackHeader, { RightSettingIcon } from '@components/BackHeader'
import { PaddingBottom } from '@components/SafePadding'
import SwapGreen from '@icons/transaction-green.svg'
import SwapRed from '@icons/transaction-red.svg'
import { DatumT, get_wallet_transactions_f } from '@query/api'
import Clipboard from '@react-native-community/clipboard'
import { useInfiniteQuery } from '@tanstack/react-query'
import { StackNav } from '@utils/types'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'

const transactions = [
  {
    green: false,
    message: 'Sent to John Doe. This is a very very long message. This is too long ',
    date: new Date(),
    amount: 0.001,
  },
  { green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002 },
  { green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002 },
  { green: false, message: 'Sent to John Doe', date: new Date(), amount: 0.001 },
  { green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002 },
  {
    green: false,
    message: 'Sent to John Doe. This is a very very long message. This is too long ',
    date: new Date(),
    amount: 0.001,
  },
  { green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002 },
  { green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002 },
  { green: false, message: 'Sent to John Doe', date: new Date(), amount: 0.001 },
  { green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002 },
  {
    green: false,
    message: 'Sent to John Doe. This is a very very long message. This is too long ',
    date: new Date(),
    amount: 0.001,
  },
  { green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002 },
  { green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002 },
  { green: false, message: 'Sent to John Doe', date: new Date(), amount: 0.001 },
  { green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002 },
  {
    green: false,
    message: 'Sent to John Doe. This is a very very long message. This is too long ',
    date: new Date(),
    amount: 0.001,
  },
  { green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002 },
  { green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002 },
  { green: false, message: 'Sent to John Doe', date: new Date(), amount: 0.001 },
  { green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002 },
  {
    green: false,
    message: 'Sent to John Doe. This is a very very long message. This is too long ',
    date: new Date(),
    amount: 0.001,
  },
  { green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002 },
  { green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002 },
  { green: false, message: 'Sent to John Doe', date: new Date(), amount: 0.001 },
  { green: true, message: 'Received from John Doe', date: new Date(), amount: 0.10002 },
]

export default function Transactions({ navigation }: { navigation: StackNav }) {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['transactions'],
    queryFn: get_wallet_transactions_f,
    getNextPageParam: (lastPage, _pages) => {
      if (!lastPage.data?.next_page_url) return undefined
      return lastPage.data.current_page + 1
    },
    initialPageParam: 1,
  })

  useEffect(() => {
    console.log(JSON.stringify(data, null, 2))
  }, [data])

  const loadNext = () => {
    fetchNextPage()
  }

  return (
    <View className='flex-1 bg-bgSecondary'>
      <BackHeader navigation={navigation} title='' RightComponent={<RightSettingIcon navigation={navigation} />} />
      <FlatList
        data={data?.pages.map((page) => page.data?.data || []).flat()}
        renderItem={({ item }) => <TransactionCard {...fun1(item)} navigation={navigation} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 10, marginTop: 0, paddingBottom: 50 }}
        ListHeaderComponent={<ListHeader />}
        ListFooterComponent={<PaddingBottom />}
        onEndReached={loadNext}
      />
    </View>
  )
}

type TransactionCardT = {
  green?: boolean
  message?: string
  date: Date
  amount?: string
  transactionId?: string
  status?: string
}

function fun1(item: DatumT): TransactionCardT {
  return {
    green: item.transaction_type === 'credit',
    message: item.description,
    date: new Date(item.created_at),
    amount: item.coin,
    transactionId: item.transaction_id,
    status: item.status,
  }
}

function ListHeader() {
  return (
    <>
      <Text className='text-neutral-500' style={{ fontSize: 27 }}>
        Your,{' '}
      </Text>
      <Text style={{ fontSize: 27 }}>Transactions</Text>
    </>
  )
}

function TransactionCard({ green = true, message, date, amount, navigation, transactionId, status }: TransactionCardT & { navigation: StackNav }) {
  const textColor = green ? '#24C917' : '#F9522E'
  const backgroundColor = green ? '#EAF9E9' : '#FEE9E4'
  const [clicked, setClicked] = useState(false)
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className='flex-row items-center justify-between rounded-2xl bg-white p-2.5'
      onPress={() => setClicked(!clicked)}
    >
      <View className='flex-row items-center gap-3' style={{ flex: 1 }}>
        <View style={{ backgroundColor }} className='rounded-xl p-2.5'>
          {green ? <SwapGreen height={27} width={27} /> : <SwapRed height={27} width={27} />}
        </View>
        <View style={{ flex: 1 }}>
          {clicked ? (
            <>
              <Text className='text-base'>{message}</Text>
              <Text
                className='text-sm text-neutral-500'
                selectable
                onPress={() => {
                  Clipboard.setString(transactionId || '')
                  ToastAndroid.show('Transaction ID copied', ToastAndroid.SHORT)
                }}
              >
                {transactionId}
              </Text>
            </>
          ) : (
            <Text className='text-base' numberOfLines={1}>
              {message}
            </Text>
          )}
          <Text className='text-neutral-500'>
            {date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            {', '}
            {date?.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
            {', '}
            {status}
          </Text>
        </View>
      </View>
      <View>
        <Text className='pr-2 text-base' style={{ color: textColor }}>
          {green ? '+' : '-'}
          {amount}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
