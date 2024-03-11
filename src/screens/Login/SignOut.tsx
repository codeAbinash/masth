import Images from '@assets/images/images'
import { Button } from '@components/Button'
import { SmallLoading } from '@components/Loading'
import { PaddingBottom } from '@components/SafePadding'
import { DefaultTransparent } from '@components/StatusBar'
import TopBar from '@components/TopBar'
import { ParamListBase, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ls } from '@utils/storage'
import React, { useState } from 'react'
import { Image, Text, View } from 'react-native'
import { OneSignal } from 'react-native-onesignal'

type TransactionDetailsRouteProp = RouteProp<ParamListBase, 'NotificationDetails'>

type TransactionDetailsNavigationProp = StackNavigationProp<ParamListBase, 'NotificationDetails'>

type Props = {
  navigation: TransactionDetailsNavigationProp
}

export default function SignOut({ navigation }: Props) {
  const [isSignOut, setIsSignOut] = useState(false)

  function signOut() {
    setIsSignOut(true)
    setTimeout(() => {
      OneSignal.logout()
      ls.clearAll()
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
    }, 0)
  }

  return (
    <>
      <DefaultTransparent />
      <View className='flex-1 justify-between p-5 pb-2'>
        <View>
          <TopBar />
        </View>
        <View className='items-center justify-center'>
          <View className='gap-1'>
            <Text className='text-center text-xl font-bold'>Are you sure you want to log out?</Text>
            <Text className='text-center text-base'>You can always sign in later</Text>
          </View>
          <Image source={Images.LogOut} style={{ width: '100%', height: '70%', resizeMode: 'contain' }} />
        </View>
        {/* <View>
          <Text>
            <Text className='text-center'>If you log out, you will not receive any notifications</Text>
            <Text className='text-center'>from the app. You can always log back in later</Text>
          </Text>
        </View> */}
        <View style={{ paddingBottom: 10 }}>
          {isSignOut ? (
            <Button title='Logging Out' variant='outline' LeftUI={<SmallLoading />} disabled={true} />
          ) : (
            <Button title='Yes, Log Out' variant='outline' onPress={signOut} />
          )}
          <Button title='Cancel' onPress={() => navigation.goBack()} className='mt-5' />
          <PaddingBottom />
        </View>
      </View>
    </>
  )
}
