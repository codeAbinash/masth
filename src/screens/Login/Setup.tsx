import useHybridData from '@/hooks/useHybridData'
import icons from '@assets/icons/icons'
import { PaddingTop, PaddingBottom } from '@components/SafePadding'
import { profile_f, ProfileT } from '@query/api'
import { useQuery } from '@tanstack/react-query'
import { StackNav } from '@utils/types'
import { useEffect } from 'react'
import { View, Image, Text } from 'react-native'
import { OneSignal } from 'react-native-onesignal'

export default function Setup({ navigation }: { navigation: StackNav }) {
  const profileQuery = useQuery({ queryKey: ['profile'], queryFn: profile_f })

  useEffect(() => {
    // Remove this method to stop OneSignal Debugging
    // OneSignal.Debug.setLogLevel(LogLevel.Verbose)
    // OneSignal Initialization
    OneSignal.initialize('7a836c6e-2ed7-4258-bc5b-099b6355d92c')
    // requestPermission will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
    OneSignal.Notifications.requestPermission(true)
    // Method for listening for notification clicks
    // OneSignal.Notifications.addEventListener('click', (event) => {
    //   console.log('OneSignal: notification clicked:', event)
    // })

    if (profileQuery.data) {
      const phone = (profileQuery?.data?.data.country_code || '') + profileQuery.data?.data.phone_number
      OneSignal.login(phone)
      console.log('OneSignal: logged in:', phone)
      // Check if referred
      console.log(profileQuery.data.refer_claimed)
      if (profileQuery.data?.refer_claimed === false) {
        navigation.replace('CheckRefer')
      } else {
        navigation.replace('Home')
      }
      // navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
    }
  }, [navigation, profileQuery.data])

  return (
    <View className='flex flex-1 items-center justify-between'>
      <PaddingTop />
      <View>
        <View className='items-center justify-center'>
          <Image source={icons.loadingGif} className='h-10 w-10' />
        </View>
        <Text className='text-center'>Please wait</Text>
        <Text className='text-center'>Setting up your account</Text>
      </View>
      <PaddingBottom />
    </View>
  )
}
