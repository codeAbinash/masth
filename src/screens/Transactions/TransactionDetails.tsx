import { Button } from '@components/Button'
import { PaddingBottom } from '@components/SafePadding'
import { ParamListBase, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { StatusBar, Text, View } from 'react-native'

type TransactionDetailsRouteProp = RouteProp<ParamListBase, 'TransactionDetails'>

type TransactionDetailsNavigationProp = StackNavigationProp<ParamListBase, 'TransactionDetails'>

function TopBar() {
  return (
    <View className='items-center justify-center'>
      <View className='w-20 rounded-full bg-neutral-300' style={{ height: 5 }} />
    </View>
  )
}

type Props = {
  route: TransactionDetailsRouteProp
  navigation: TransactionDetailsNavigationProp
}

export default function TransactionDetails({ navigation, route }: Props) {
  return (
    <>
      <StatusBar barStyle={'default'} />
      <View className='flex-1 justify-between p-5 pb-2'>
        <View>
          <TopBar />
          <Text className='mt-5 text-center text-xl font-bold'>Transaction Details</Text>
          <Text className='mt-5 text-lg'>{JSON.stringify(route.params, null, 2)}</Text>
        </View>
        <View>
          <Button title='Ok, Got it' onPress={() => navigation.goBack()} />
          <PaddingBottom />
        </View>
      </View>
    </>
  )
}
