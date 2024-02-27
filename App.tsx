import {NavigationContainer} from '@react-navigation/native'
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack'
import Home from '@screens/Home'
import Login from '@screens/Login/Login'
import SignUp from '@screens/Login/SignUp'
import NotificationDetails from '@screens/Others/NotificationDetails'
import Notifications from '@screens/Others/Notifications'
import Settings from '@screens/Others/Settings'
import TransactionDetails from '@screens/Transactions/TransactionDetails'
import Transactions from '@screens/Transactions/Transactions'
import React from 'react'
import {Dimensions, SafeAreaView, StatusBar, Text} from 'react-native'
import {PaperProvider} from 'react-native-paper'
import {SafeAreaProvider} from 'react-native-safe-area-context'

const Stack = createStackNavigator()
const {width, height} = Dimensions.get('window')

function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        // gestureEnabled: true,
        // gestureDirection: 'horizontal',
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        // gestureResponseDistance: width,
      }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='SignUp' component={SignUp} />
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
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='Settings' component={Settings} />
      <Stack.Screen name='Transactions' component={Transactions} />
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

export default function App(): React.JSX.Element {
  return (
    // <GestureHandlerRootView style={{flex: 1}}>
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1, height: height, backgroundColor: 'red'}}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
        <PaperProvider>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaView>
    </SafeAreaProvider>
    // </GestureHandlerRootView>
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
