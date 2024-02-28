import { Button } from '@components/Button'
import { PaddingBottom } from '@components/SafePadding'
import { DefaultTransparent } from '@components/StatusBar'
import TopBar from '@components/TopBar'
import { ParamListBase, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Text, View } from 'react-native'

type TransactionDetailsRouteProp = RouteProp<ParamListBase, 'NotificationDetails'>

type TransactionDetailsNavigationProp = StackNavigationProp<ParamListBase, 'NotificationDetails'>

type Props = {
  route: TransactionDetailsRouteProp
  navigation: TransactionDetailsNavigationProp
}

export default function NotificationDetails({ navigation, route }: Props) {
  return (
    <>
      <DefaultTransparent />
      <View className='flex-1 justify-between p-5 pb-2'>
        <View>
          <TopBar />
          <Text className='mt-5 text-center text-xl font-bold'>Notification Details</Text>
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
