import { DarkContentTransparentStatusBar } from '@components/StatusBar'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import Home from '@screens/Home'
import EditProfile from '@screens/Home/Profile/EditProfile'
import Login from '@screens/Login/Login'
import OTP from '@screens/Login/OTP'
import SignUp from '@screens/Login/SignUp'
import NotificationDetails from '@screens/Others/NotificationDetails'
import Notifications from '@screens/Others/Notifications'
import Settings from '@screens/Others/Settings'
import Refer from '@screens/Refer/Refer'
import TransactionDetails from '@screens/Transactions/TransactionDetails'
import Transactions from '@screens/Transactions/Transactions'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StackNav } from '@utils/types'
import React, { useCallback, useEffect } from 'react'
import { Dimensions, SafeAreaView, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'
import { showErr } from './src/query/api'
import { appStorage } from '@utils/storage'
import { SmallLoading } from '@components/Loading'

const Stack = createStackNavigator()
const { width, height } = Dimensions.get('window')

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: 1,
      onError: showErr,
    },
  },
})

export default function App(): React.JSX.Element {
  return (
    // <SafeAreaProvider>
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, height: height, backgroundColor: 'red' }}>
          <DarkContentTransparentStatusBar />
          <PaperProvider>
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </PaperProvider>
        </SafeAreaView>
      </GestureHandlerRootView>
    </QueryClientProvider>
    //  </SafeAreaProvider>
  )
}

function NavigationDecider({ navigation }: { navigation: StackNav }) {
  const decide = useCallback(async () => {
    const token = appStorage.getString('token')
    if (token) {
      navigation.replace('Home')
    } else {
      navigation.replace('Login')
    }
  }, [navigation])

  useEffect(() => {
    decide()
  }, [decide])

  return (
    <View className='flex-1 items-center justify-center bg-white p-5'>
      <SmallLoading />
    </View>
  )
}

function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        // gestureEnabled: true,gestureDirection: 'horizontal', gestureResponseDistance: width,
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      {/* <Stack.Screen name='Test' component={TestScreen} /> */}
      <Stack.Screen
        name='navigationDecider'
        component={NavigationDecider}
        options={{ cardStyleInterpolator: CardStyleInterpolators.forNoAnimation }}
      />
      <Stack.Screen name='Login' component={Login} options={{ cardStyleInterpolator: CardStyleInterpolators.forNoAnimation }} />
      <Stack.Screen name='Home' component={Home} options={{ cardStyleInterpolator: CardStyleInterpolators.forNoAnimation }} />
      <Stack.Screen name='SignUp' component={SignUp} />
      <Stack.Screen name='OTP' component={OTP} />
      <Stack.Screen name='Notifications' component={Notifications} />
      <Stack.Screen
        name='NotificationDetails'
        component={NotificationDetails}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='EditProfile' component={EditProfile} />
      <Stack.Screen name='Settings' component={Settings} />
      <Stack.Screen name='Transactions' component={Transactions} />
      <Stack.Screen name='Refer' component={Refer} />
      <Stack.Screen
        name='TransactionDetails'
        component={TransactionDetails}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
      />
    </Stack.Navigator>
  )
}

function Profile() {
  return <Text>Profile</Text>
}

// const config: TransitionSpec = {
//   animation: 'spring',
//   config: {
//     stiffness: 1000,
//     damping: 50,
//     mass: 3,
//     overshootClamping: false,
//     restDisplacementThreshold: 0.01,
//     restSpeedThreshold: 0.01,
//   },
// }

// const closeConfig: TransitionSpec = {
//   animation: 'timing',
//   config: {
//     duration: 200,
//     easing: Easing.linear,
//   },
// }
